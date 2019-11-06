import React, { forwardRef, RefForwardingComponent } from 'react'
import { Link, LinkProps } from 'react-router-dom'

const AdapterLink: RefForwardingComponent<HTMLAnchorElement, LinkProps> = (
  props,
  ref
) => <Link innerRef={ref} {...props} />

export default forwardRef(AdapterLink)
