import { FormEvent, useCallback, useState } from "react"

import { formatHyperlinks } from "@spatialsys/js/util/format-hyperlinks"
import {
  HyperlinkProperties,
  InteractionName,
  InteractionType,
  ObjectType,
  TrackedComponent,
  TrackedComponents,
  getUrlHost,
  useTrackInteraction,
} from "@spatialsys/react/analytics"
import { UnityMessages } from "@spatialsys/unity/bridge"
import { InputWithLabel } from "@spatialsys/web/core/js/components/create-hyperlink-portal/input-with-label/input-with-label"
import { CreatePortal } from "@spatialsys/web/core/js/components/create-portal-modal/create-portal-modal"
import {
  ModalWithInstanceCount,
  ModalWithInstanceCountProps,
} from "@spatialsys/web/core/js/components/modal-with-instance-count/modal-with-instance-count"
import { Button, Heading } from "@spatialsys/web/ui"

type CreateHyperlinkPortalContentProps = Pick<ModalWithInstanceCountProps, "onRequestClose">

const CreateHyperlinkPortalContent = (props: CreateHyperlinkPortalContentProps) => {
  const { onRequestClose } = props

  const [linkHref, setLinkHref] = useState("")
  const [linkLabel, setLinkLabel] = useState("")

  const trackInteraction = useTrackInteraction()

  const handlePortalCreate: CreatePortal = useCallback(
    (roomId?: string, linkHref?: string, linkLabel?: string) => {
      UnityMessages.createPortal({ roomId, linkHref, linkLabel })
      onRequestClose(null)
    },
    [onRequestClose]
  )

  const submit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      const formattedLink = formatHyperlinks(linkHref)
      event.preventDefault()

      const host = getUrlHost(formattedLink)
      const interactionProperties: HyperlinkProperties = {
        host,
        url: linkHref,
        title: linkLabel,
        objectType: ObjectType.Portal,
      }

      trackInteraction(
        {
          type: InteractionType.Submission,
          name: InteractionName.HyperlinkCreated,
        },
        interactionProperties
      )

      handlePortalCreate(undefined, formattedLink, linkLabel)
    },
    [handlePortalCreate, linkHref, linkLabel, trackInteraction]
  )

  return (
    <form onSubmit={submit} className="grid justify-center gap-5">
      <Heading size="h3">New Portal</Heading>

      <div className="w-[325px] rounded-2xl border-2 border-gray-200">
        <InputWithLabel
          header="Title"
          currentValue={linkLabel}
          setValue={setLinkLabel}
          placeholder="My Portfolio"
          type="text"
        />
        <hr />
        <InputWithLabel
          header="Link"
          currentValue={linkHref}
          setValue={setLinkHref}
          placeholder="https://"
          type="url"
          required
        />
      </div>
      <Button disabled={linkHref === ""} size="xl" fullWidth type="submit">
        Create
      </Button>
    </form>
  )
}

type CreateHyperlinkPortalProps = CreateHyperlinkPortalContentProps & {
  onClickBack: () => void
} & ModalWithInstanceCountProps

export function CreateHyperlinkPortal(props: CreateHyperlinkPortalProps) {
  const { onRequestClose, onClickBack, ...modalProps } = props

  return (
    <ModalWithInstanceCount
      classNameContainer="text-center py-12 px-14"
      onRequestClose={onRequestClose}
      onClickBack={onClickBack}
      {...modalProps}
    >
      <TrackedComponent id={TrackedComponents.CreateHyperlinkPortal}>
        <CreateHyperlinkPortalContent onRequestClose={onRequestClose} />
      </TrackedComponent>
    </ModalWithInstanceCount>
  )
}
