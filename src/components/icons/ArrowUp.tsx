import * as React from "react";
import type { SVGProps } from "react";

const ArrowUp = React.memo((props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path d="M12 4l-8 8h6v8h4v-8h6z" />
  </svg>
));

ArrowUp.displayName = 'ArrowUp';

export default ArrowUp;