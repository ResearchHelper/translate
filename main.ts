import { Plugin, Button, View } from "research-helper";
import translate from "translate";

class MyPlugin extends Plugin {
  root: HTMLDivElement;

  enable() {
    let button = {
      id: "translate",
      icon: "translate",
      tooltip: "translate",
      click: this.showTranslate,
    } as Button;
    this.addPDFMenuBtn(button);

    let view = {
      buttonId: button.id,
      onMounted: this.mountView,
    } as View;
    this.registerPDFMenuView(view);
  }

  showTranslate() {
    this.togglePDFMenuView(true);
  }

  mountView(root: HTMLElement) {
    let divRaw = document.createElement("div");
    divRaw.innerHTML = document.getSelection()?.toString() || "";

    let divTranslated = document.createElement("div");
    let hr = document.createElement("hr");
    hr.style.opacity = "0.3";

    translate(divRaw.innerHTML, "zh").then((text) => {
      divTranslated.innerHTML = text;
    });

    let container = document.createElement("div");
    container.style.margin = "0.5rem";
    container.style.padding = "0.5rem";
    container.style.borderStyle = "solid";
    container.style.borderWidth = "1px";
    container.append(divRaw, hr, divTranslated);

    root.append(container);
  }
}

export default MyPlugin;
