/*
Adapted from: 
- https://mantine.dev/guides/polymorphic/
- https://github.com/mantinedev/mantine/blob/master/src/mantine-utils/src/create-polymorphic-component/create-polymorphic-component.ts
- https://www.freecodecamp.org/news/build-strongly-typed-polymorphic-components-with-react-and-typescript
 */
import React from "react"

export type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type InheritedProps<C extends React.ElementType, Props = {}> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicRef<C> = C extends React.ElementType ? React.ComponentPropsWithRef<C>["ref"] : never

export type PolymorphicComponentProps<C, Props = {}> = C extends React.ElementType
  ? InheritedProps<C, Props> & { ref?: PolymorphicRef<C> }
  : Props & { as: React.ElementType }

export function createPolymorphicComponent<ComponentDefaultType, Props, StaticComponents = Record<string, never>>(
  component: any
) {
  type ComponentProps<C> = PolymorphicComponentProps<C, Props>

  type _PolymorphicComponent = <C = ComponentDefaultType>(props: ComponentProps<C>) => React.ReactElement

  type ComponentProperties = Omit<React.FunctionComponent<ComponentProps<any>>, never>

  type PolymorphicComponent = _PolymorphicComponent & ComponentProperties & StaticComponents

  return component as PolymorphicComponent
}
