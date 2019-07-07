import React, { forwardRef } from 'react'
import { Link, LinkProps } from 'react-router-dom'

const AdapterLink = forwardRef((props: LinkProps, ref) => (
  <Link innerRef={ref as any} {...props} />
))

export default AdapterLink
