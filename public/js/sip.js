let ua, session;

function initJsSIP({ uri, password, ws }) {
  const socket = new JsSIP.WebSocketInterface(ws);
  const configuration = {
    sockets: [socket],
    uri,
    password,
    session_timers: false
  };

  ua = new JsSIP.UA(configuration);
  ua.start();

  ua.on("newRTCSession", function (e) {
    if (session) return;
    session = e.session;

    if (e.originator === 'remote') {
      session.answer({ mediaConstraints: { audio: true, video: false } });
    }

    session.connection.addEventListener('addstream', function (e) {
      const remoteAudio = document.getElementById("remoteAudio");
      remoteAudio.srcObject = e.stream;
    });

    session.on("ended", () => session = null);
    session.on("failed", () => session = null);
  });
}

function call(target) {
  if (!ua) return;
  session = ua.call(`sip:${target}@webrtc.jobsconnect.com.br`, {
    mediaConstraints: { audio: true, video: false }
  });
}

function hangup() {
  if (session) session.terminate();
}
