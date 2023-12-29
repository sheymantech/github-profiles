"use strict";
const formBtn = document.querySelector("form");
const input = document.getElementById("input");
const container = document.querySelector(".main-cont");
// const repos = document.querySelector(".repos");

const APIURL = "https://api.github.com/users/";

//listen to the submit event

formBtn.addEventListener("submit", function (e) {
  e.preventDefault();
  fetchInfo(input.value);
  fetchInfoRepos(input.value);
  input.value = "";
});

//fecting the account info

const fetchInfo = async function (username) {
  const resp = await fetch(`${APIURL}${username}`);
  const data = await resp.json();
  console.log(data);
  insertHtmlEl(data);
};

const fetchInfoRepos = async function (username) {
  const resp = await fetch(`${APIURL}${username}/repos`);
  const data = await resp.json();
  insertHtmlElRepo(data);
};

const insertHtmlEl = function (data) {
  const html = `
  <div class="col-lg-4 col-5 img-wrapper1">
              <div class="img-wrapper">
                <img src="${data.avatar_url}" alt="" />
              </div>
            </div>
            <div class="text-white col-lg-8 col-10">
              <h3>${data.name}</h3>
              <p class="bio">${data.login}</p>
              <p>
                ${data.bio}
              </p>
              <div class="icons-wrapper">
                <div class="icon">
                  <i class="bi bi-eye-fill"></i> <span>${data.followers}</span>
                </div>
                <div class="icon">
                  <i class="bi bi-chat-square-heart-fill"></i> <span>${data.following}</span>
                </div>
                <div class="icon">
                  <i class="bi bi-chat-left-fill"></i> <span>${data.public_repos}</span>
                </div>
              </div> 
  `;
  container.insertAdjacentHTML("afterbegin", html);
};

const insertHtmlElRepo = function (data) {
  const element = data
    .map((data) => {
      return `
                <a href="${data.html_url}">${data.name}</a>
            
      `;
    })
    .slice(0, 10)
    .join("");
  const elementDiv = document.createElement("div");
  elementDiv.classList.add("repos-flex");
  elementDiv.innerHTML = element;

  console.log(elementDiv);
  container.appendChild(elementDiv);
};
