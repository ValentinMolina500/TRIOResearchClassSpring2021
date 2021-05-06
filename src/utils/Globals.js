class Globals {
  ALLOWED_IMG_EXTENSIONS = ["png", "pdf", "img", "jpg", "jpeg"]
}

export const Status = {
  NEEDS_REVIEW: "NEEDS_REVIEW",
  VALID: "VALID",
  REJECT: "REJECT"
}

const instance = new Globals();

export default instance;