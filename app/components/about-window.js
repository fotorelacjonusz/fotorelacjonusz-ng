const Vue = require("vue/dist/vue.common.js")

export const AboutWindow = {
  template: `
    <div class="about-window flex-window">
      <navbar>
        <router-link
            to="/"
            class="button is-light"
            v-translate>
            Back
        </router-link>
      </navbar>

      <article class="spread text-selectable">
        <div class="hero">
          <article class="hero-body container">
            <h1 class="title">Fotorelacjonusz</h1>
            <h2 class="subtitle">
              <translate>Version</translate> {{appVersion}}
            </h2>
          </article>
        </div>

        <section class="section">
          <h3 class="subtitle" v-translate>About this build</h3>

          <table class="table">
            <tr>
              <td>Fotorelacjonusz</td>
              <td>{{appVersion}}</td>
            </tr>
            <tr>
              <td>NW.js</td>
              <td>{{versions.nw}} ({{versions["nw-flavor"]}})</td>
            </tr>
            <tr>
              <td>Chromium</td>
              <td>{{versions.chromium}}</td>
            </tr>
            <tr>
              <td>Node.js</td>
              <td>{{versions.node}}</td>
            </tr>
            <tr>
              <td>V8</td>
              <td>{{versions.v8}}</td>
            </tr>
            <tr>
              <td>OpenSSL</td>
              <td>{{versions.openssl}}</td>
            </tr>
          </table>
        </section>

        <section class="section">
          <h3 class="subtitle" v-translate>Legal</h3>

          <p>
            Copyright &copy; 2019–2020 Sebastian Skałacki.
          </p>

          <p>
            Fotorelacjonusz is free software: you can redistribute it and/or
            modify it under the terms of the GNU General Public License
            as published by the Free Software Foundation, either version 3
            of the License, or (at your option) any later version.
          </p>

          <p>
            This program is distributed in the hope that it will be useful,
            but WITHOUT ANY WARRANTY; without even the implied warranty of
            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
            GNU General Public License for more details.
          </p>

          <p>
            You should have received a copy of the GNU General Public License
            along with this program.  If not, see
            https://www.gnu.org/licenses/.
          </p>
        </section>

        <section class="section">
          <h3 class="subtitle" v-translate>Thanks</h3>

          <p v-translate>
            Many thanks to Kamil OST, who wrote the original C++ version of
            Fotorelacjonusz;
            to MariuszLu and his Friend, who contributed the program icon;
            and to everyone who posts photo reports with or without help of
            this program.
          </p>
        </section>

        <section class="section">
          <h3 class="subtitle" v-translate>More help and information</h3>

          <translate>Visit</translate>
          <a :href="homeURL" target="_blank">{{homeURL}}</a>.
        </section>

        <footer class="footer has-text-centered has-background-white">
          <img :src="iconURL" width="200">
        </footer>

      </article>
    </div>
  `,

  computed: {
    appVersion() { return global.nw.App.manifest.version },

    homeURL() {
      return "https://github.com/fotorelacjonusz/fotorelacjonusz-ng"
    },

    iconURL() { return "/icon/rounded.png" },

    versions() { return require("process").versions },
  }
}

Vue.component("about-window", AboutWindow)
