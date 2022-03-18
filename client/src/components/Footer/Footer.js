import React from "react";

function Footer() {
  return (
    <div>
      <footer class="bg-dark text-center text-white footer mt-auto py-3" >
        <div class="container p-4 pb-0">
          <section class="mb-4">
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="bi bi-facebook"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="bi bi-youtube"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="bi bi-github"></i>
            </a>

            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="bi bi-question-square-fill"></i>
            </a>
          </section>
        </div>

        <div class="text-center p-3">
          © 2021 Copyright :
          <a class="text-white" href="https://google.com/">
            MineImage.com
          </a>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
