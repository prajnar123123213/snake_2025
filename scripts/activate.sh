export GIT_USER_NAME="jm1021"
export GIT_USER_NAME="jmort1021@gmail.com"

# Function to check if a line exists in run commands
line_exists_in_rc() {
  grep -Fxq "$1" ~/.bashrc
}

# Function to add line to run commands
add_to_rc() {
  if ! line_exists_in_rc "$1"; then
    echo "$1" >> ~/.bashrc
  fi
}

add_to_rc 'alias code="code --no-sandbox"'
add_to_rc 'alias venv="source venv/bin/activate"'
add_to_rc "git config --global user.name $GIT_USER_NAME"
add_to_rc "git config --global user.email $GIT_USER_EMAIL"

#### Github Pages Local Build support
echo "=== GitHub pages build tools  ==="
add_to_rc "# Ruby Gem Path"
add_to_rc 'export GEM_HOME="$HOME/gems"'
add_to_rc 'export PATH="$HOME/gems/bin:$PATH"'
echo "=== Gem install starting, thinking... ==="
gem install jekyll bundler

# GitHub VSCode extensiions
code --install-extension github.vscode-github-actions
code --install-extension eamodio.gitlens

# Python VSCode Extensions
code --install-extension ms-python.python --pre-release

# Jupyter VSCode Extension
code --install-extension ms-toolsai.jupyte --pre-releaser

# GitHub Copilot Extension
code --install-extension GitHub.copilot