import { NanoTypeJp } from "./typing";

const t = new NanoTypeJp();

window.addEventListener("DOMContentLoaded", () => {
  const registerHiragana =
    document.querySelector<HTMLParagraphElement>("#registerHiragana");
  const registerTextarea = document.querySelector<HTMLTextAreaElement>(
    "#registerForm textarea"
  );
  const registerButton = document.querySelector<HTMLButtonElement>(
    "#registerForm button"
  );
  const inputPattern =
    document.querySelector<HTMLParagraphElement>("#inputPattern");
  const resultContent =
    document.querySelector<HTMLParagraphElement>("#resultContent");

  let isRegistered = false;

  if (
    !registerHiragana ||
    !registerTextarea ||
    !registerButton ||
    !inputPattern ||
    !resultContent
  ) {
    console.log(
      registerHiragana,
      registerTextarea,
      registerButton,
      inputPattern
    );
    throw new Error("必要要素がないためデバッグを開始できません");
  }

  const resetQuestionText = () => {
    registerHiragana.textContent = "";
    registerTextarea.value = "";
    inputPattern.textContent = "";
    isRegistered = false;
  };

  const updateQuestionText = ({
    completed,
    remained,
  }: {
    completed: string;
    remained: string;
  }) => {
    const completedTextElement = document.createElement("p");
    completedTextElement.style.color = "grey";
    completedTextElement.textContent = completed;

    const remainedTextElement = document.createElement("p");
    remainedTextElement.style.color = "red";
    remainedTextElement.textContent = remained;

    const fragment = new DocumentFragment();
    fragment.appendChild(completedTextElement);
    fragment.appendChild(remainedTextElement);

    registerHiragana.prepend(fragment);
  };

  registerButton.addEventListener("click", () => {
    const value = registerTextarea?.value;

    console.log("textarea value:", value);

    if (value) {
      try {
        const registerResult = t.registerNewHiragana(value);
        console.log("register result:", registerResult);

        updateQuestionText({
          completed: registerResult.inputAlphabet.completedInputAlphabet,
          remained: registerResult.inputAlphabet.remainedAlphabet,
        });

        let pattern = "";
        registerResult.inputPattern.forEach((p) => {
          pattern = pattern + JSON.stringify(p, null, 4) + "<br />";
        });
        inputPattern.innerHTML = pattern;

        isRegistered = true;
      } catch (e) {
        alert(e);
      }
    }

    registerButton.blur();
  });

  window.addEventListener("keypress", (e) => {
    if (!isRegistered) return;

    const typeKey = e.key;

    const answerResult = t.answerAlphabet(typeKey);
    console.log("answer result:", answerResult);

    resultContent.innerHTML = JSON.stringify(answerResult);

    switch (answerResult.result) {
      case "correct":
        updateQuestionText({
          completed: answerResult.inputAlphabet.completedInputAlphabet,
          remained: answerResult.inputAlphabet.remainedAlphabet,
        });
        break;
      case "fail":
        break;
      case "complete":
        resetQuestionText();
    }
  });
});
