import { useQueryClient } from "@tanstack/react-query"
import clsx from "clsx"
import { memo, useCallback, useMemo } from "react"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { useBoolean } from "@spatialsys/react/hooks/use-boolean"
import { usePatchMeMutation } from "@spatialsys/react/query-hooks/sapi/user"
import { makeSocialProfileQueryKey } from "@spatialsys/react/query-hooks/users/profiles"
import UpdatedTermsImg from "@spatialsys/web/core/img/profiles/updated-terms.png"
import { InstanceCount } from "@spatialsys/web/core/js/components/instance-count/instance-count"
import { Modal, modalClassesBase } from "@spatialsys/web/core/js/components/modal/modal"
import { useShouldShowAcceptUpdatedTermsSept2022 } from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { sapiClient } from "@spatialsys/web/sapi"
import { Button } from "@spatialsys/web/ui"

import classes from "./updated-terms-modal.module.scss"

interface UpdatedTermsModalProps {
  openProfilePageOnAccept: boolean
  username?: string
  useInstanceCount?: boolean
}

export const UpdatedTermsModal = memo(function UpdatedTermsModal(props: UpdatedTermsModalProps) {
  const { openProfilePageOnAccept, username, useInstanceCount } = props
  const [isChecked, setIsChecked] = useBoolean()

  const queryClient = useQueryClient()
  const shouldShowAcceptUpdatedTermsSept2022 = useShouldShowAcceptUpdatedTermsSept2022()
  const { mutate: patchUser } = usePatchMeMutation(sapiClient, {
    onSuccess: () => {
      if (username) {
        void queryClient.invalidateQueries(makeSocialProfileQueryKey({ username }))
      }
    },
  })

  const acceptUpdatedTerms = useCallback(() => {
    patchUser({
      acceptUpdatedTerms: true,
      acceptUpdatedPrivacyPolicy: true,
    })
    if (openProfilePageOnAccept) {
      window.open("/profile", "_blank", "noopener")
    }
  }, [patchUser, openProfilePageOnAccept])

  const modalBody = useMemo(() => {
    return (
      <div className={clsx("modal-body", classes.modalBody)}>
        <TrackedComponent as="div" id={TrackedComponents.UpdatedTermsModal} className={classes.container} key="welcome">
          <div>
            <img src={UpdatedTermsImg.src} width={320} alt="new social profiles" />
          </div>
          <div className={classes.title}>Spatial Profiles</div>
          <div className={classes.subtitle}>
            Display your spaces, claim a unique username, describe yourself, and link out to other platforms. To cover
            this new feature, we’ve updated our policies!
          </div>
          <label className={classes.termsAgreement}>
            <input className={classes.checkbox} type="checkbox" checked={isChecked} onChange={setIsChecked.toggle} />
            <span>
              I have read and agree to the updated{" "}
              <a className={classes.link} href="/terms" target="_blank" rel="noreferrer">
                Terms of Use
              </a>{" "}
              and{" "}
              <a className={classes.link} href="/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
            </span>
          </label>
          <Button size="xl" color={isChecked ? "black" : "outline"} disabled={!isChecked} onClick={acceptUpdatedTerms}>
            Check It Out
          </Button>
        </TrackedComponent>
      </div>
    )
  }, [acceptUpdatedTerms, isChecked, setIsChecked.toggle])

  return (
    <Modal
      modalBaseClass={modalClassesBase.base}
      isOpen={shouldShowAcceptUpdatedTermsSept2022}
      darkOverlay
      shouldFocusAfterRender
      closeTimeoutMS={200}
    >
      {useInstanceCount ? <InstanceCount>{modalBody}</InstanceCount> : modalBody}
    </Modal>
  )
})
