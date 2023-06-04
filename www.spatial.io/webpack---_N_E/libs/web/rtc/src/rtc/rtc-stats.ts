import LiveSwitch from "fm.liveswitch"

class RTCStreamStats {
  // Activate candidate pair stats
  public rttMSec: number

  // Local candidate stats
  public localPort: number

  // Remote candidate stats
  public remotePort: number

  public remoteIP: string

  public Refresh(streamStats: LiveSwitch.MediaStreamStats, _: number) {
    const transportStats = streamStats.getTransport()
    const activeCandidatePair = transportStats.getActiveCandidatePair()

    if (activeCandidatePair != null) {
      // Active candidate pair stats
      this.rttMSec = activeCandidatePair.getCurrentRoundTripTime()

      // Local candidate stats
      const activeLocalCandidate = transportStats.getLocalCandidate(activeCandidatePair.getLocalCandidateId())
      this.localPort = activeLocalCandidate.getPort()

      // Remote candidate stats
      const activeRemoteCandidate = transportStats.getRemoteCandidate(activeCandidatePair.getRemoteCandidateId())
      this.remotePort = activeRemoteCandidate.getPort()
      this.remoteIP = activeRemoteCandidate.getIPAddress()
    }
  }
}

class RTCStreamSenderStats extends RTCStreamStats {
  // Media sender stats
  bytesSent: number

  packetsSent: number

  nacks: number

  // -- Computed stats
  bytesSentPerSecond: number

  packetsSentPerSecond: number

  nacksPerSecond: number

  // Media track stats
  framesSent: number

  // -- Computed stats
  framesSentPerSecond: number

  public override Refresh(streamStats: LiveSwitch.MediaStreamStats, timeDelta: number) {
    super.Refresh(streamStats, timeDelta)

    // Media receiver stats
    const mediaStreamStats = streamStats.getSender()
    const previousBytesSent = this.bytesSent
    const previousPacketsSent = this.packetsSent
    const previousNacks = this.nacks
    this.bytesSent = mediaStreamStats.getBytesSent()
    this.packetsSent = mediaStreamStats.getPacketsSent()
    this.nacks = mediaStreamStats.getNackCount()

    // --  Computed stats
    this.bytesSentPerSecond = (this.bytesSent - previousBytesSent) / timeDelta
    this.packetsSentPerSecond = this.packetsSent - previousPacketsSent / timeDelta
    this.nacksPerSecond = (this.nacks - previousNacks) / timeDelta

    // Media track stats
    const mediaTrackStats = mediaStreamStats.getTrack()
    const previousFramesSent = this.framesSent
    this.framesSent = mediaTrackStats.getFramesSent()
    // -- Computed stats
    this.framesSentPerSecond = this.framesSent - previousFramesSent / timeDelta
  }
}

class RTCStreamReceiverStats extends RTCStreamStats {
  // Media receiver stats
  bytesReceived: number

  jitterMSec: number

  packetsReceived: number

  packetsLost: number

  nacks: number

  // -- Computed stats
  bytesReceivedPerSecond: number

  packetsReceivedPerSecond: number

  packetsLostPerSecond: number

  percentPacketsLost: number

  nacksPerSecond: number

  // Media track stats
  framesReceived: number

  framesDropped: number

  // -- Computed stats
  framesReceivedPerSecond: number

  framesDroppedPerSecond: number

  percentFramesDropped: number

  public override Refresh(streamStats: LiveSwitch.MediaStreamStats, timeDelta: number) {
    super.Refresh(streamStats, timeDelta)

    // Media receiver stats
    const mediaStreamStats = streamStats.getReceiver()
    const previousBytesReceived = this.bytesReceived
    const previousPacketsReceived = this.packetsReceived
    const previousPacketsLost = this.packetsLost
    const previousNacks = this.nacks
    this.bytesReceived = mediaStreamStats.getBytesReceived()
    this.jitterMSec = mediaStreamStats.getJitter()
    this.packetsReceived = mediaStreamStats.getPacketsReceived()
    this.packetsLost = mediaStreamStats.getPacketsLost()
    this.nacks = mediaStreamStats.getNackCount()
    // --  Computed stats
    const packetsReceivedDelta = this.packetsReceived - previousPacketsReceived
    const packetsLostDelta = this.packetsLost - previousPacketsLost
    this.bytesReceivedPerSecond = (this.bytesReceived - previousBytesReceived) / timeDelta
    this.packetsReceivedPerSecond = packetsReceivedDelta / timeDelta
    this.packetsLostPerSecond = packetsLostDelta / timeDelta
    this.nacksPerSecond = (this.nacks - previousNacks) / timeDelta
    this.percentPacketsLost = (packetsLostDelta / (packetsReceivedDelta + packetsLostDelta)) * 100

    // Media track stats
    const mediaTrackStats = mediaStreamStats.getTrack()
    const previousFramesReceived = this.framesReceived
    const previousFramesDropped = this.framesDropped
    this.framesReceived = mediaTrackStats.getFramesReceived()
    this.framesDropped = mediaTrackStats.getFramesDropped()
    // -- Computed stats
    const framesReceivedDelta = this.framesReceived - previousFramesReceived
    const framesDroppedDelta = this.framesDropped - previousFramesDropped
    this.framesReceivedPerSecond = framesReceivedDelta / timeDelta
    this.framesDroppedPerSecond = framesDroppedDelta / timeDelta
    this.percentFramesDropped = (framesDroppedDelta / framesReceivedDelta) * 100
  }
}

export abstract class RTCMediaStats {
  private hasAudio: boolean

  private hasVideo: boolean

  protected audioStats = new RTCStreamStats()

  protected videoStats = new RTCStreamStats()

  private time: number = new Date().getTime()

  public Refresh(stats: LiveSwitch.ConnectionStats) {
    const timeDelta = new Date().getTime()
    this.time = new Date().getTime()

    this.hasAudio = stats.getAudioStream() != null
    if (this.hasAudio) {
      this.audioStats.Refresh(stats.getAudioStream(), timeDelta)
    }

    this.hasVideo = stats.getVideoStream() != null
    if (this.hasVideo) {
      this.videoStats.Refresh(stats.getVideoStream(), timeDelta)
    }
  }
}

export class RTCMediaSenderStats extends RTCMediaStats {
  public GetAudioStats() {
    return this.audioStats as RTCStreamSenderStats
  }

  public GetVideoStats() {
    return this.videoStats as RTCStreamSenderStats
  }

  public MediaSenderStats() {
    this.audioStats = new RTCStreamSenderStats()
    this.videoStats = new RTCStreamSenderStats()
  }
}

export class RTCMediaReceiverStats extends RTCMediaStats {
  public GetAudioStats() {
    return this.audioStats as RTCStreamSenderStats
  }

  public GetVideoStats() {
    return this.videoStats as RTCStreamSenderStats
  }

  public MediaReceiverStats() {
    this.audioStats = new RTCStreamReceiverStats()
    this.videoStats = new RTCStreamReceiverStats()
  }
}
