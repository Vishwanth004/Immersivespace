export const Storage = {
  STORAGE_RETURN_URL_KEY: "return_url",
  STORAGE_LOCAL_LOG_LEVEL_KEY: "local_log_level",
  STORAGE_REMOTE_LOG_LEVEL_KEY: "remote_log_level",
  STORAGE_FINISHED_TUTORIAL_KEY: "tutorial",
  STORAGE_AUTHLESS_BADGES_KEY: "badges_to_claim",
  STORAGE_SPACE_LIST_TAB_KEY: "space_list_tab",
  STORAGE_UNITY_WEBGL_VERSION_KEY: "unity_webgl_version",
  SPATIAL_MEDIA_SETTINGS: "SpatialMediaSettings",
  HAS_DISPLAYED_VIDEO_PERMISSIONS_MODAL: "has_displayed_video_permissions_modal",
  MIXPANEL_DEBUG: "mixpanel_debug",
  REDUX_DEBUG: "redux_debug",
  LAST_PUSH_NOTIF_PERMISSION_REQUEST_DATE_KEY: "lastPushNotifPermissionRequestDate",
  LAST_USED_EMOTE_PANEL_TAB: "lastUsedEmotePanelTab",
  AUTHLESS_DISPLAY_NAME_LOCAL_STORAGE_KEY: "authlessDisplayName",
  AUTHLESS_AVATAR_LOCAL_STORAGE_KEY: "authlessAvatar",

  // TODO - tighten this type, it should only be string, or explicitly parsed as JSON
  // but we're using number and bools in some places.
  fetch<T = string>(key: string, defaultValue?: T, { raw = true }: { raw?: boolean } = {}): T | undefined {
    if (typeof localStorage === "undefined") {
      return defaultValue
    }

    const value = localStorage.getItem(key)
    if (value === null) {
      if (defaultValue === undefined) {
        return value as unknown as T
      }
      return defaultValue
    }
    if (!raw) {
      return JSON.parse(value) as T
    }
    return value as unknown as T
  },
  setItem(key: string, value: any) {
    localStorage?.setItem(key, value)
  },
  removeItem(key: string) {
    localStorage?.removeItem(key)
  },
}

export type StorageT = typeof Storage
