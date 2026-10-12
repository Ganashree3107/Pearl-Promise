const CHECKOUT_DRAFT_KEY = "Pearl Promise-checkout-draft";

export function readCheckoutDraft() {
  const storedDraft = sessionStorage.getItem(CHECKOUT_DRAFT_KEY);
  return storedDraft ? JSON.parse(storedDraft) : null;
}

export function saveCheckoutDraft(draft) {
  sessionStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draft));
}

export function clearCheckoutDraft() {
  sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
}
