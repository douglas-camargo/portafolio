import * as React from "react";
import type { SVGProps } from "react";

const Moon = React.memo((props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
  </svg>
));

Moon.displayName = 'Moon';

export default Moon;