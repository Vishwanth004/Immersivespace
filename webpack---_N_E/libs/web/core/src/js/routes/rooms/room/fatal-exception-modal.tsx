import * as Sentry from "@sentry/nextjs"
import axios from "axios"
import clsx from "clsx"
import { memo, useState } from "react"

import Config from "@spatialsys/web/config"
import { Modal, modalClassesBase } from "@spatialsys/web/core/js/components/modal/modal"
import { useUser } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { Button, Heading } from "@spatialsys/web/ui"

interface FatalExceptionModalProps {
  onRequestClose: () => void
}

const FatalExceptionModal = memo(function (props: FatalExceptionModalProps) {
  const { user } = useUser()
  const [name, setName] = useState(user.displayName)
  const [email, setEmail] = useState(user.email)
  const [comments, setComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastEventId] = useState(Sentry.lastEventId())

  const submit = () => {
    setIsSubmitting(true)

    const url = `https://sentry.io/api/0/projects/${Config.SENTRY_ORG_SLUG}/${Config.SENTRY_PROJECT_SLUG}/user-feedback/`
    const config = { headers: { Authorization: `DSN ${Config.SENTRY_DSN}` } }
    const body = {
      event_id: lastEventId,
      // All fields are required to be non-empty, hence the "none" placeholders
      name: name.length >= 0 ? name : "none",
      email: email.length >= 0 ? email : "none",
      comments: comments.length >= 0 ? comments : "none",
    }

    axios
      .post(url, body, config)
      .catch((e) => {
        console.warn("Exception encountered when posting user feedback", e)
      })
      .finally(() => {
        props.onRequestClose()
      })
  }

  return (
    <Modal
      isOpen
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      darkOverlay
      modalBaseClass={clsx(modalClassesBase.base, "room__modal")}
      overlayClassName="absolute inset-0 z-above-modal"
      onRequestClose={props.onRequestClose}
    >
      <form className="z-[1000000] flex flex-col rounded-2xl bg-white p-8">
        <Heading size="h3" textAlign="center" className="mb-3">
          Sorry! We’ve hit a minor bump in the virtual road{" "}
          <span role="img" aria-label="dizzy face">
            😵
          </span>
        </Heading>
        <p className="text-gray600 mb-3 text-center">
          With your help we can fix it! Please help us understand what went wrong{" "}
          <span role="img" aria-label="thank you">
            🙏
          </span>
        </p>

        <label htmlFor="nameField" className="mt-3 text-lg">
          Name (optional)
        </label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 rounded-sm border bg-gray-100 p-2 text-lg"
          id="nameField"
          type="text"
          placeholder="Name (optional)"
        />

        <label htmlFor="emailField" className="mt-3 text-lg">
          Email (optional)
        </label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 rounded-sm border bg-gray-100 p-2 text-lg"
          id="emailField"
          type="email"
          placeholder="Email (optional)"
        />

        <label htmlFor="commentsField" className="mt-3 text-lg">
          What happened?
        </label>
        <textarea
          value={comments}
          onChange={(event) => setComments(event.target.value)}
          placeholder="Describe what was going on right before this message popped up"
          className="mt-1 rounded-sm border bg-gray-100 p-2 text-lg"
          autoFocus
        />

        <div className="mt-4 flex flex-row justify-center">
          <Button
            className="mx-3 px-5"
            color="outline"
            size="xl"
            onClick={props.onRequestClose}
            disabled={isSubmitting}
          >
            Reload
          </Button>
          <Button className="mx-3 px-5" size="xl" onClick={submit} disabled={isSubmitting}>
            Submit and Reload
          </Button>
        </div>
      </form>
    </Modal>
  )
})

export default FatalExceptionModal
