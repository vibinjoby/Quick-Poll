let deletePollId = null;
const token = localStorage.getItem("token");
window.onload = () => {
  if (!token) window.location.href = "/";
  showLoadingPopup();
  fetchMyPolls();
};

function copyLink(pollId, pollLayout) {
  const el = document.createElement("textarea");
  el.value = `https://quick-poll.netlify.app/joinpoll.html?pollId=${pollId}&pollLayout=${pollLayout}`;
  el.setAttribute("readonly", "");
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
  showToast("Link Copied");
}

function fetchMyPolls() {
  fetch(`https://quick-poll-server.herokuapp.com/polls/getMyPolls`, {
    headers: {
      "x-auth-token": token
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("HTTP Status" + res.status);
      }
      return res.text();
    })
    .then(data => {
      document.getElementById("card-container").innerHTML = data;
      hideLoadingPopup();
      animateOptions();
    })
    .catch(err => {
      hideLoadingPopup();
      showToast(err.message);
      window.location.href = "/";
    });
}

function updateDeletePollId(deletePollId) {
  this.deletePollId = deletePollId;
}

function deletePoll() {
  fetch(
    `https://quick-poll-server.herokuapp.com/polls/deletePoll/${this.deletePollId}`,
    {
      method: "DELETE",
      headers: {
        "x-auth-token": token
      }
    }
  )
    .then(res => {
      if (!res.ok) {
        throw new Error("HTTP Status" + res.status);
      }
      return res;
    })
    .then(() => {
      //Hide the modal popup
      $("[data-dismiss=modal]").trigger({ type: "click" });
      showToast("Poll deleted Successfully");
      fetchMyPolls();
    })
    .catch(err => {
      hideLoadingPopup();
      showToast(err.message);
      window.location.href = "/";
    });
}

const navigateToPoll = (pollId, layoutId, result) => {
  if (layoutId == 0) {
    window.location.href = `/viewtextpoll.html?pollId=${pollId}&result=1`;
  } else if (layoutId == 1) {
    window.location.href = `/option-text-poll.html?pollId=${pollId}&result=1`;
  } else {
    window.location.href = `/img_poll.html?pollId=${pollId}&result=1`;
  }
};

const animateOptions = () => {
  var options = document.querySelectorAll(".card");
  var tl = gsap.timeline();
  options.forEach(elem => {
    tl.from(elem, {
      duration: 0.2,
      z: -100,
      opacity: 0,
      scale: 0.5
    });
  });
};

const showToast = message => {
  Toastify({
    text: message,
    close: false,
    gravity: "top", // `top` or `bottom`
    position: "center",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    duration: 3000
  }).showToast();
};

/**
 * Loading popup functions
 */
const showLoadingPopup = () => {
  document.getElementById("loading-placeholder").style.display = "block";
};

const hideLoadingPopup = () => {
  document.getElementById("loading-placeholder").style.display = "none";
};
