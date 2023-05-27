import { SettingInput } from "research-helper";
import { Plugin, Button, View } from "research-helper";
import translate from "translate";

class Translate extends Plugin {
  from: string = "en";
  to: string = "zh";

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

    let fromLangSetting = this.getSettingValue("From language") as
      | SettingInput
      | undefined;
    if (!fromLangSetting) {
      fromLangSetting = {
        label: "From language",
        description: "Translate from which Language?",
        type: "input",
        inputType: "text",
        value: "en",
      } as SettingInput;
      this.addSetting(fromLangSetting);
    } else {
      this.from = fromLangSetting.value as string;
    }

    let toLangSetting = this.getSettingValue("To language") as
      | SettingInput
      | undefined;
    if (!toLangSetting) {
      toLangSetting = {
        label: "To language",
        description: "Translate to which Language?",
        type: "input",
        inputType: "text",
        value: "zh",
      } as SettingInput;
      this.addSetting(toLangSetting);
    } else {
      this.to = toLangSetting.value as string;
    }
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

    translate(divRaw.innerHTML, { from: this.from, to: this.to }).then(
      (text) => {
        divTranslated.innerHTML = text;
      }
    );

    let container = document.createElement("div");
    container.style.margin = "0.5rem";
    container.style.padding = "0.5rem";
    container.style.borderStyle = "solid";
    container.style.borderWidth = "1px";
    container.append(divRaw, hr, divTranslated);

    root.append(container);
  }
}

export default Translate;
