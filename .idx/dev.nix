# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env

{ pkgs, ... }: {
  # Which nixpkgs channel to ause.
  channel = "unstable"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.go
    pkgs.python311
    pkgs.python311Packages.pip
    pkgs.nodejs_22
    pkgs.nodePackages.nodemon
    pkgs.husky
    pkgs.pnpm
    pkgs.jdk
    pkgs.bash
    pkgs.openssl
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
 "dbaeumer.vscode-eslint"
 "rangav.vscode-thunder-client"
 "bradlc.vscode-tailwindcss"
 "christian-kohler.npm-intellisense"
 "christian-kohler.path-intellisense"
 "CoenraadS.bracket-pair-colorizer-2"
 "DavidAnson.vscode-markdownlint"
 "dsznajder.es7-react-js-snippets"
 "eclipse-theia.builtin-extension-pack"
 "ecmel.vscode-html-css"
 "Equinusocio.vsc-community-material-theme"
 "esbenp.prettier-vscode"
 "mikestead.dotenv"
 "ms-vscode.js-debug"
 "ms-vscode.vscode-typescript-next"
 "pflannery.vscode-versionlens"
 "PKief.material-icon-theme"
 "Tomi.xasnippets"
 "usernamehw.errorlens"
 "xabikos.JavaScriptSnippets"
 "yzhang.markdown-all-in-one"
 "ms-python.debugpy"
 "ms-python.python"
 "hirosystems.clarity-lsp"
 "Prisma.prisma"
  ];

    # Enable previews
    # previews = {
    #   enable = true;
    #   previews = {
    #     web = {
    #       # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
    #       # and show it in IDX's web preview panela
    #       command = ["npm" "run" "dev"];
    #       manager = "web";
    #       env = {
    #         # Environment variables to set for your server
    #         PORT = "3000";
    #       };
    #     };
    #   };
    # };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        npm-install = "pnpm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
      };
    };
  };
}