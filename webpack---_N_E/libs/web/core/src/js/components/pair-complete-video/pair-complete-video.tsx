import * as React from "react"

import PairCompleteMP4 from "@spatialsys/web/core/img/pair-complete.mp4"
import PairCompletePoster from "@spatialsys/web/core/img/pair-complete.png"

const PairCompleteVideo = () => {
  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        borderRadius: "50%",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      <video autoPlay muted loop playsInline poster={PairCompletePoster.src}>
        <source src={PairCompleteMP4} type="video/mp4" />
      </video>
    </div>
  )
}

export default React.memo(PairCompleteVideo)
