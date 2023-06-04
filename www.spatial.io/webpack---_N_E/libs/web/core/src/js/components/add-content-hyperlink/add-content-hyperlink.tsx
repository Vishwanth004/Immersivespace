import { ChangeEvent, FormEventHandler, memo, useCallback, useEffect, useMemo, useReducer } from "react"

import { formatHyperlinks } from "@spatialsys/js/util/format-hyperlinks"
import {
  HyperlinkProperties,
  InteractionName,
  InteractionType,
  TrackedComponents,
  getObjectType,
  getUrlHost,
  useTrackInteraction,
  withTrackedComponent,
} from "@spatialsys/react/analytics"
import { AppStateSelectors, ModelState } from "@spatialsys/unity/app-state"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { useAppContext } from "@spatialsys/web/app-context"
import { InputWithCharCount } from "@spatialsys/web/core/js/components/add-content-hyperlink/components/input-with-char-count"
import { TextareaWithCharCount } from "@spatialsys/web/core/js/components/add-content-hyperlink/components/textarea-with-char-count"
import { RowWithToggle } from "@spatialsys/web/core/js/components/row-with-toggle/row-with-toggle"
import { Button, Heading } from "@spatialsys/web/ui"

import classes from "./add-content-hyperlink.module.scss"

interface AddContentHyperlinkProps {
  closePanel: () => void
  selectedObjectId: number
}

const NAME_CHAR_LIMIT = 100
const CREATOR_CHAR_LIMIT = 100
const DESCRIPTION_CHAR_LIMIT = 280

interface State {
  name: string
  creator: string
  description: string
  link: string
  linkLabel: string
  isInfoPanelVisible: boolean
  initialState: State
}

const enum ActionType {
  SetName,
  SetCreator,
  SetDescription,
  SetLink,
}

type Action = {
  type: ActionType
  payload: string
}

function init(initialState: State): State {
  return {
    ...initialState,
    initialState,
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.SetName:
      return { ...state, name: action.payload }
    case ActionType.SetCreator:
      return { ...state, creator: action.payload }
    case ActionType.SetDescription:
      return { ...state, description: action.payload }
    case ActionType.SetLink:
      return { ...state, link: action.payload }
    default:
      return state
  }
}

/**
 * To add, edit or remove hyperlinks, names, creators and descriptions to images/videos/3D objects
 *
 * Designed to work inside of a side panel but will likely work in other views as well
 *
 */
const AddContentHyperlinkComponent = memo(function AddContentHyperlink(props: AddContentHyperlinkProps) {
  const { closePanel, selectedObjectId } = props

  const trackInteraction = useTrackInteraction()

  const galleryInfo = useAppContext((context) =>
    AppStateSelectors.getGalleryInfo(context.state.unity.appState, selectedObjectId)
  )
  const hyperlinkState = useAppContext((context) =>
    AppStateSelectors.getObjectHyperlink(context.state.unity.appState, selectedObjectId)
  )

  const isObjectImage = useAppContext((context) =>
    AppStateSelectors.isImage(context.state.unity.appState, selectedObjectId)
  )
  const isObjectVideo = useAppContext((context) =>
    AppStateSelectors.isVideo(context.state.unity.appState, selectedObjectId)
  )

  const object = useAppContext((context) => {
    const scene = context.state.unity.appState.roomSession.sharedState.scene
    if (isObjectImage) return scene.images[selectedObjectId]
    if (isObjectVideo) return scene.videoPlayers[selectedObjectId]
    return scene.models[selectedObjectId]
  })
  const fileId = useMemo(() => object?.url.split("//")[1], [object])
  const fileName = (object as ModelState)?.fileName
  const fileFromContentMetadata = useAppContext((context) => context.state.unity.appState.contentMetaDataCache[fileId])

  const [state, dispatch] = useReducer(
    reducer,
    {
      name: galleryInfo?.title ?? fileName ?? fileFromContentMetadata?.name,
      creator: galleryInfo?.creator,
      description: galleryInfo?.description,
      link: hyperlinkState?.linkHref,
      linkLabel: hyperlinkState?.linkLabel,
      isInfoPanelVisible: galleryInfo?.isVisible,
      initialState: null,
    },
    init
  )

  const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SetName, payload: event.target.value })
  }, [])
  const onChangeCreator = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SetCreator, payload: event.target.value })
  }, [])
  const onChangeDescription = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: ActionType.SetDescription, payload: event.target.value })
  }, [])
  const onChangeLink = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SetLink, payload: event.target.value })
  }, [])

  const handleInfoPanelDisplay = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      UnityMessages.setGalleryInfoVisibility(selectedObjectId, event.target.checked)
    },
    [selectedObjectId]
  )

  const trackAnalytics = useCallback(
    (interactionName: InteractionName) => {
      const host = getUrlHost(state.link)

      const objectType = getObjectType(isObjectImage, isObjectVideo)

      const interactionProperties: HyperlinkProperties = {
        host,
        url: state.link,
        title: state.name,
        objectType,
        description: state.description,
        creator: state.creator,
        isPlaqueVisible: galleryInfo?.isVisible,
      }

      trackInteraction({ type: InteractionType.Submission, name: interactionName }, interactionProperties)
    },
    [
      galleryInfo?.isVisible,
      isObjectImage,
      isObjectVideo,
      state.creator,
      state.description,
      state.link,
      state.name,
      trackInteraction,
    ]
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault()
      closePanel()
      trackAnalytics(InteractionName.HyperlinkCreated)
    },
    [closePanel, trackAnalytics]
  )

  useEffect(() => {
    UnityMessages.setGalleryInfoContent(selectedObjectId, state.creator, state.name, state.description)
    const formattedLink = formatHyperlinks(state.link)

    UnityMessages.addHyperlink(selectedObjectId, formattedLink, state.linkLabel ?? "View")
  }, [selectedObjectId, state.creator, state.name, state.description, state.link, state.linkLabel])

  const resetInfo = () => {
    closePanel()
    UnityMessages.setGalleryInfoContent(
      selectedObjectId,
      state.initialState.creator,
      state.initialState.name,
      state.initialState.description
    )
    UnityMessages.addHyperlink(selectedObjectId, state.initialState.link, state.initialState.linkLabel ?? "View")
    UnityMessages.setGalleryInfoVisibility(selectedObjectId, state.initialState.isInfoPanelVisible)
    trackAnalytics(InteractionName.HyperlinkEditCancelled)
  }

  return (
    <>
      <Heading as="h2" size="h3" textAlign="center" className="mb-6 self-center">
        Information Panel
      </Heading>
      <form onSubmit={handleSubmit} onReset={resetInfo} className={classes.formContainer}>
        <div className={classes.infoSubsection}>
          <InputWithCharCount
            label="Name"
            placeholder="Cool Art Piece"
            value={state.name}
            onChange={onChangeName}
            maxLength={NAME_CHAR_LIMIT}
          />
          <hr />
          <InputWithCharCount
            label="Creator"
            placeholder="Artist"
            value={state.creator}
            onChange={onChangeCreator}
            maxLength={CREATOR_CHAR_LIMIT}
          />

          <hr />
          <TextareaWithCharCount
            value={state.description}
            onChange={onChangeDescription}
            placeholder="This piece is cool because..."
            maxLength={DESCRIPTION_CHAR_LIMIT}
            label="Description"
          />
          <hr />
          <InputWithCharCount
            placeholder="https://www.spatial.io"
            label="Link"
            value={state.link}
            onChange={onChangeLink}
          />
        </div>
        <div className={classes.infoSubsection}>
          <RowWithToggle
            label="Show Info Panel in Space"
            checked={galleryInfo?.isVisible}
            icons={false}
            onChange={handleInfoPanelDisplay}
            id="Show-Info-Panel-in-Space-12"
          />
        </div>
        <Button size="xl" type="submit">
          Save
        </Button>
        <Button variant="text" type="reset">
          Cancel
        </Button>
      </form>
    </>
  )
})

export const AddContentHyperlink = withTrackedComponent(AddContentHyperlinkComponent, {
  id: TrackedComponents.AddContentHyperlink,
  className: classes.infoContainer,
  as: "div",
})
