import {Constants} from "../constants";
import {addStyle} from "../util/addStyle";
import {addScript} from "../util/addScript";
import {ecodeRenderAdapter} from "./adapterRender";

declare function Ecode(ele: HTMLElement): string

export const ecodeRender = (element: (HTMLElement | Document) = document, cdn = Constants.CDN, theme: string) => {
    const ecodeElements = ecodeRenderAdapter.getElements(element);
    if (ecodeElements.length > 0) {
        addStyle(`${cdn}/dist/js/ecode/ecode.css`, "vditorEcodeStyle");
        addScript(`${cdn}/dist/js/ecode/ecode.js`, "vditorEcodeScript").then(() => {
            ecodeElements.forEach((e: HTMLDivElement) => {
                if (e.parentElement.classList.contains("vditor-wysiwyg__pre") ||
                    e.parentElement.classList.contains("vditor-ir__marker--pre")) {
                    return;
                }

                const text = ecodeRenderAdapter.getCode(e);
                if (!text) {
                    return;
                }

                try {

                    if (e.getAttribute("data-processed") === "true") {
                        return;
                    }

                    if (!e.classList.contains("ecode")) {
                        e.classList.add("ecode")
                    }


                    Ecode(e);

                    e.setAttribute("data-processed", "true");

                } catch (error) {
                    e.className = "vditor-reset--error";
                    e.innerHTML = `ecode render error: <br>${error}`;
                }
            });
        });
    }
};
