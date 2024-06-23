const GIT_HUB_API_URL = "https://api.github.com/users/";

const user_section = document.getElementById("user-section");

const getUser = async (username) => {
  const res = await fetch(GIT_HUB_API_URL + username);
  const userinfo = await res.json();

  const card = `
    <div class="card mb-3">
        <div class="row g-0 user-center">
            <div class="col-md-4 text-center border-gray-right">
            <img
                src="${userinfo.avatar_url}"
                class="rounded-circle img-fluid"
                alt="User Image"
            />
            <a href="${userinfo.html_url}" target="_blank" class="btn btn-primary view-profile-btn">View Profile</a>
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${userinfo.name}</h5>
                <p class="card-text"> ${userinfo.bio} </p>

                <ul class="stats-info">
                    <li>${userinfo.public_repos} <strong>Repositories</strong></li>
                    <li>${userinfo.followers} <strong>Followers</strong></li>
                    <li>${userinfo.following} <strong>Following</strong></li>
                </ul>

                <div id="repos">
                </div>
            </div>
            </div>
        </div>
    </div>
  `;

  user_section.innerHTML = card;
  getRepositories(username);
};

getUser("github");

const getRepositories = async (username) => {
  const repos = document.getElementById("repos");

  const res = await fetch(GIT_HUB_API_URL + username + "/repos");
  const repoinfo = await res.json();

  repoinfo.forEach((item) => {
    const element = document.createElement("a");
    element.classList.add("repo", "btn", "btn-primary");
    element.href = item.html_url;
    element.innerText = item.name;
    repos.appendChild(element);
    element.target = "_blank";
  });
};

const formSubmit = () => {
  const searchInput = document.querySelector("#search");
  if (searchInput.value != "") {
    getUser(searchInput.value);
    searchInput.value = "";
  }

  return false;
};
