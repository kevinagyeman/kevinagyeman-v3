import { jsx } from 'react/jsx-runtime';
import 'react';
import { B as Button } from './main_BQk79EPp.mjs';

function Links({ linksString }) {
  const linksArray = linksString.split(";").filter((item) => item.trim());
  const links = [];
  for (let i = 0; i < linksArray.length; i += 2) {
    if (linksArray[i + 1]) {
      links.push({ label: linksArray[i], url: linksArray[i + 1] });
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: links.map((link, index) => /* @__PURE__ */ jsx(Button, { variant: "outline", children: /* @__PURE__ */ jsx("a", { href: link.url, target: "_blank", rel: "noopener noreferrer", children: link.label }) }, index)) });
}

export { Links as L };
