import { UseQueryResult } from "@tanstack/react-query"

import { TemplateState as Template } from "@spatialsys/unity/app-state"
import TemplateThumbnail from "@spatialsys/web/core/img/environment-thumbnails/template-icon.png"
import EnvironmentTemplateGrid from "@spatialsys/web/core/js/components/environment-template/environment-template-grid/environment-template-grid"
import { backupThumbnails } from "@spatialsys/web/core/js/util/space-thumbnails"
import { Loader } from "@spatialsys/web/ui"

import classes from "./environment-template-picker.module.scss"

interface TemplatePickerProps {
  templatesQuery: UseQueryResult<Template[], unknown>
  onSelect: (templateID: string) => void
}

const TemplatePicker = (props: TemplatePickerProps) => {
  const getThumbnailFromTemplate = (template: Template, index: number) =>
    template.thumbnail ? template.thumbnail : backupThumbnails[index % backupThumbnails.length].src
  const { isError, data } = props.templatesQuery

  if (data) {
    return data.length > 0 ? (
      <EnvironmentTemplateGrid useTemplateGrid={true}>
        {data.map((template: Template, index: number) => (
          <button
            type="button"
            className={classes.btnOption}
            key={template.id}
            id={`template-option-${template.id}`}
            onClick={() => props.onSelect(template.id)}
          >
            <div
              className={classes.image}
              style={{ backgroundImage: `url(${getThumbnailFromTemplate(template, index)})` }}
            >
              <div className={classes.imageMask} />
              <img src={TemplateThumbnail.src} className={classes.icon} alt="Template" />
              <div className={classes.templateNameContainer}>
                <div className={classes.name}>{template.name}</div>
              </div>
            </div>
          </button>
        ))}
      </EnvironmentTemplateGrid>
    ) : (
      <div className={classes.empty}>You have not created any templates yet.</div>
    )
  } else if (isError) {
    return (
      <div className={classes.error}>Sorry! Something went wrong while fetching your templates. Try again later</div>
    )
  } else {
    return (
      <div className={classes.loading}>
        <Loader variant="fancy" color="black" />
      </div>
    )
  }
}

export default TemplatePicker
