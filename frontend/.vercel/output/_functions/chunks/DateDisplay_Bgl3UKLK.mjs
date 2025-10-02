import { jsxs } from 'react/jsx-runtime';
import { b as formatDate } from './main_BQk79EPp.mjs';
import 'react';

function DateDisplay({ period }) {
  return /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
    formatDate(period.start_date),
    " -",
    " ",
    period.is_present_date || period.end_date === null ? "Present" : formatDate(period.end_date)
  ] });
}

export { DateDisplay as D };
