import { SESSIONS } from "../data/session.store.js";

class SessionService {
  getMessages(sessionId) {
    return SESSIONS[sessionId] || [];
  }

  addMessage(sessionId, message) {
    if (!SESSIONS[sessionId]) {
      SESSIONS[sessionId] = [];
    }

    SESSIONS[sessionId].push(message);
  }

  clearSession(sessionId) {
    delete SESSIONS[sessionId];
  }
}

export default new SessionService();