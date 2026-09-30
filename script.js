const form = document.querySelector("#ticket-form");
const intro = document.querySelector("#intro");
const ticketResult = document.querySelector("#ticket-result");
const avatarInput = document.querySelector("#avatar-upload");
const avatarTrigger = document.querySelector("#avatar-trigger");
const uploadDefault = document.querySelector("#upload-default");
const avatarPreview = document.querySelector("#avatar-preview");
const avatarActions = document.querySelector("#avatar-actions");
const avatarError = document.querySelector("#avatar-error");
const formStatus = document.querySelector("#form-status");

const fields = {
  name: { input: document.querySelector("#full-name"), error: document.querySelector("#name-error") },
  email: { input: document.querySelector("#email"), error: document.querySelector("#email-error") },
  github: { input: document.querySelector("#github-username"), error: document.querySelector("#github-error") },
};

let selectedAvatar = null;
let avatarObjectUrl = null;

function setFieldError(field, message) {
  field.error.textContent = message;
  field.input.setAttribute("aria-invalid", String(Boolean(message)));
}

function setAvatarError(message) {
  avatarError.textContent = message;
  avatarTrigger.setAttribute("aria-invalid", String(Boolean(message)));
}

function showAvatar(file) {
  if (avatarObjectUrl) URL.revokeObjectURL(avatarObjectUrl);
  selectedAvatar = file;
  avatarObjectUrl = URL.createObjectURL(file);
  avatarPreview.src = avatarObjectUrl;
  avatarPreview.alt = "Prévia da foto selecionada: " + file.name;
  avatarPreview.hidden = false;
  uploadDefault.hidden = true;
  avatarActions.hidden = false;
  setAvatarError("");
}

function clearAvatar() {
  if (avatarObjectUrl) {
    URL.revokeObjectURL(avatarObjectUrl);
    avatarObjectUrl = null;
  }
  selectedAvatar = null;
  avatarInput.value = "";
  avatarPreview.removeAttribute("src");
  avatarPreview.alt = "";
  avatarPreview.hidden = true;
  uploadDefault.hidden = false;
  avatarActions.hidden = true;
}

function validateAvatar(file) {
  if (!file) {
    setAvatarError("Escolha uma foto para gerar seu ingresso.");
    return false;
  }
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    clearAvatar();
    setAvatarError("Formato não aceito. Escolha uma imagem JPG ou PNG.");
    return false;
  }
  if (file.size > 500 * 1024) {
    clearAvatar();
    setAvatarError("A foto precisa ter no máximo 500 KB.");
    return false;
  }
  showAvatar(file);
  return true;
}

function validateName() {
  const value = fields.name.input.value.trim();
  const valid = value.length >= 2;
  setFieldError(fields.name, valid ? "" : value ? "Digite um nome com pelo menos 2 caracteres." : "Informe seu nome completo.");
  return valid;
}

function validateEmail() {
  const value = fields.email.input.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  setFieldError(fields.email, valid ? "" : value ? "Digite um endereço de e-mail válido." : "Informe seu e-mail.");
  return valid;
}

function validateGithub() {
  const value = fields.github.input.value.trim().replace(/^@/, "");
  const valid = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(value) && !value.includes("--");
  setFieldError(fields.github, valid ? "" : value ? "Use de 1 a 39 letras, números ou hífens simples." : "Informe seu usuário do GitHub.");
  return valid;
}

fields.name.input.addEventListener("input", () => {
  if (fields.name.input.value.trim().length >= 2) setFieldError(fields.name, "");
});
fields.email.input.addEventListener("input", () => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.input.value.trim())) setFieldError(fields.email, "");
});
fields.github.input.addEventListener("input", () => {
  const value = fields.github.input.value.trim().replace(/^@/, "");
  if (/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(value) && !value.includes("--")) setFieldError(fields.github, "");
});

avatarTrigger.addEventListener("click", () => avatarInput.click());
document.querySelector("#change-avatar").addEventListener("click", () => avatarInput.click());
document.querySelector("#remove-avatar").addEventListener("click", () => {
  clearAvatar();
  setAvatarError("");
  avatarTrigger.focus();
});
avatarInput.addEventListener("change", () => {
  const [file] = avatarInput.files;
  if (file) validateAvatar(file);
});
avatarTrigger.addEventListener("dragover", (event) => {
  event.preventDefault();
  avatarTrigger.classList.add("is-dragging");
});
avatarTrigger.addEventListener("dragleave", () => avatarTrigger.classList.remove("is-dragging"));
avatarTrigger.addEventListener("drop", (event) => {
  event.preventDefault();
  avatarTrigger.classList.remove("is-dragging");
  const [file] = event.dataTransfer.files;
  if (file) validateAvatar(file);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  const avatarIsValid = validateAvatar(selectedAvatar);
  const nameIsValid = validateName();
  const emailIsValid = validateEmail();
  const githubIsValid = validateGithub();

  if (!avatarIsValid || !nameIsValid || !emailIsValid || !githubIsValid) {
    formStatus.textContent = "Revise os campos destacados antes de continuar.";
    const firstInvalid = [
      !avatarIsValid ? avatarTrigger : null,
      !nameIsValid ? fields.name.input : null,
      !emailIsValid ? fields.email.input : null,
      !githubIsValid ? fields.github.input : null,
    ].find(Boolean);
    firstInvalid?.focus();
    return;
  }

  const fullName = fields.name.input.value.trim().replace(/\s+/g, " ");
  const email = fields.email.input.value.trim();
  const github = fields.github.input.value.trim().replace(/^@/, "");
  document.querySelector("#result-name").textContent = fullName.split(/\s+/)[0];
  document.querySelector("#result-email").textContent = email;
  document.querySelector("#ticket-name").textContent = fullName;
  document.querySelector("#ticket-github").textContent = "@" + github;
  document.querySelector("#result-avatar").src = avatarObjectUrl;
  document.querySelector("#result-avatar").alt = "Foto de " + fullName;
  document.querySelector("#ticket-number").textContent = "#" + String(Math.floor(10000 + Math.random() * 90000));

  intro.hidden = true;
  form.hidden = true;
  ticketResult.hidden = false;
  document.querySelector("#reset-button").focus();
});

document.querySelector("#reset-button").addEventListener("click", () => {
  form.reset();
  clearAvatar();
  Object.values(fields).forEach((field) => setFieldError(field, ""));
  setAvatarError("");
  formStatus.textContent = "";
  ticketResult.hidden = true;
  intro.hidden = false;
  form.hidden = false;
  fields.name.input.focus();
});

window.addEventListener("beforeunload", () => {
  if (avatarObjectUrl) URL.revokeObjectURL(avatarObjectUrl);
});
