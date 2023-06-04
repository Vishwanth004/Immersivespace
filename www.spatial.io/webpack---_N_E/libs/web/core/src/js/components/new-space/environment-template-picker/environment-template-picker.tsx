import clsx from "clsx"

import { TrackedComponent, TrackedComponents } from "@spatialsys/react/analytics"
import { useTemplatesQuery } from "@spatialsys/react/query-hooks/sapi/content"
import { useAcknowledgeNotificationMutation } from "@spatialsys/react/query-hooks/sapi/user"
import { VREnvironment } from "@spatialsys/unity/app-state"
import { EnvironmentOption } from "@spatialsys/web/app-state"
import {
  useShouldShowCollectibleEnvironmentsUpdated,
  useUser,
} from "@spatialsys/web/core/js/components/user/user-query-hooks"
import { sapiClient } from "@spatialsys/web/sapi"

import EnvironmentPicker from "../../environment-template/environment-template-grid/environment-picker"
import TemplatePicker from "../../environment-template/environment-template-grid/template-picker"

import classes from "./environment-template-picker.module.scss"

export enum EnvironmentTemplateTabOption {
  Environments = 0,
  CreatorToolkit = 1,
  Collectibles = 2,
  Templates = 3,
}

export interface EnvironmentTemplatePickerProps {
  tab: EnvironmentTemplateTabOption
  setTab: (tab: EnvironmentTemplateTabOption) => void
  onSelectEnvironment: (option: EnvironmentOption, variant: number) => void
  onSelectTemplate?: (templateID: string) => void
  includeTemplates: boolean
  innerScrollingEnabled?: boolean
  currentEnvironment?: VREnvironment
  currentCustomNftEnvironmentId?: string
  includeCustomEnvironment?: boolean
  includePrivateLobbyEnvironment?: boolean
  sidebarTitle?: string
  sidebarClassName?: string
}

const EnvironmentTemplatePicker = (props: EnvironmentTemplatePickerProps) => {
  const {
    tab,
    setTab,
    onSelectEnvironment,
    onSelectTemplate,
    includeTemplates,
    currentEnvironment,
    currentCustomNftEnvironmentId,
    includeCustomEnvironment,
    includePrivateLobbyEnvironment,
    sidebarTitle,
  } = props

  const templatesQuery = useTemplatesQuery(sapiClient, {
    enabled: includeTemplates,
  })

  const { user } = useUser()
  const { collectibleEnvironmentsUpdateKey } = user.treatmentsParsed
  const showNewCollectiblesIndicator = useShouldShowCollectibleEnvironmentsUpdated(collectibleEnvironmentsUpdateKey)
  const { mutate: acknowledgeNotification } = useAcknowledgeNotificationMutation(sapiClient)

  return (
    <div className={classes.container}>
      <div className={clsx(classes.sidebar, props.sidebarClassName)}>
        {sidebarTitle && <h2 className={classes.title}>{sidebarTitle}</h2>}
        <div className={classes.sidebarTabs}>
          <button
            className={clsx(classes.sidebarTab, {
              [classes.active]: tab === EnvironmentTemplateTabOption.Environments,
            })}
            onClick={() => setTab(EnvironmentTemplateTabOption.Environments)}
          >
            Free
          </button>
          <button
            className={clsx(classes.sidebarTab, {
              [classes.active]: tab === EnvironmentTemplateTabOption.CreatorToolkit,
            })}
            onClick={() => setTab(EnvironmentTemplateTabOption.CreatorToolkit)}
          >
            Creator Toolkit
          </button>
          <button
            className={clsx(classes.sidebarTab, {
              [classes.active]: tab === EnvironmentTemplateTabOption.Collectibles,
            })}
            onClick={() => {
              setTab(EnvironmentTemplateTabOption.Collectibles)
              if (showNewCollectiblesIndicator) {
                acknowledgeNotification({
                  userId: user.id,
                  notification: collectibleEnvironmentsUpdateKey,
                })
              }
            }}
          >
            Collectibles
            {showNewCollectiblesIndicator && (
              <span className={classes.collectibleDotContainer}>
                <span className={classes.collectibleDot} />
              </span>
            )}
          </button>
          {includeTemplates && (
            <button
              className={clsx(classes.sidebarTab, {
                [classes.active]: tab === EnvironmentTemplateTabOption.Templates,
              })}
              onClick={() => setTab(EnvironmentTemplateTabOption.Templates)}
            >
              Your Templates
            </button>
          )}
        </div>
      </div>

      <hr />

      <div className={classes.innerWrapper}>
        {tab === EnvironmentTemplateTabOption.Environments && (
          <TrackedComponent id={TrackedComponents.EnvironmentsList}>
            <EnvironmentPicker
              currentEnvironment={currentEnvironment}
              currentCustomNftEnvironmentId={currentCustomNftEnvironmentId}
              onSelect={onSelectEnvironment}
              includeDefaultEnvironments
              includeCustomEnvironment={includeCustomEnvironment}
              includePrivateLobbyEnvironment={includePrivateLobbyEnvironment}
              hideByLine
            />
          </TrackedComponent>
        )}
        {tab === EnvironmentTemplateTabOption.CreatorToolkit && (
          <TrackedComponent id={TrackedComponents.CreatorToolkitEnvironmentsList}>
            <EnvironmentPicker
              currentEnvironment={currentEnvironment}
              currentCustomNftEnvironmentId={currentCustomNftEnvironmentId}
              onSelect={onSelectEnvironment}
              includeDefaultEnvironments={false}
              includeCreatorToolkitEnvironments
            />
          </TrackedComponent>
        )}
        {tab === EnvironmentTemplateTabOption.Collectibles && (
          <TrackedComponent id={TrackedComponents.CollectibleEnvironmentsList}>
            <EnvironmentPicker
              currentEnvironment={currentEnvironment}
              currentCustomNftEnvironmentId={currentCustomNftEnvironmentId}
              onSelect={onSelectEnvironment}
              includeDefaultEnvironments={false}
              includeNFTEnvironments
            />
          </TrackedComponent>
        )}
        {tab === EnvironmentTemplateTabOption.Templates && (
          <TrackedComponent id={TrackedComponents.TemplatesList}>
            <TemplatePicker templatesQuery={templatesQuery} onSelect={onSelectTemplate} />
          </TrackedComponent>
        )}
      </div>
    </div>
  )
}

export default EnvironmentTemplatePicker
