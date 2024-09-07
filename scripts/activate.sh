<<comment
# Help
# Objective of this exercise is to test cloud environment ...
#     plus, start a Web Server
# The hash # is a comment or action ...
#     # is a comment symbol in a .sh file 
# The dollar $ represent a terminal command ... 
#     $ is not part of command

# Start a terminal for commands
git clone https://github.com/jm1021/john_2025.git
$ ./scripts/activate.sh

# Run the cat command, leave this terminal open ...
#    the cat command shows remaining instructions  ...
#    find this spot and continue on
$ cat ./scripts/activate.sh

# Start a new terminal ...
#    the "new" terminal is the command terminal ...
#    the "original" terminal shows commands ...
#    type commands in "new" terminal
$ cd john_2025
$ ./scripts/venh.sh
$ source venv
$ bundle install

# Run project with Jekyll
$ bundle exec jekyll serve

$ Run project with customized Makefile
$ make

$ Runv VSCode
$ code .

# End
# The build execution is complete ...
#     Ctl-Click on "link" in terminal ...
#     observe web site in the opened browser

comment
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

# Check if .env file exists
if [ ! -f .env ]; then
  echo ".env file not found. Please create a .env file with the necessary environment variables."
  echo "Setup with:"
  echo "GITHUB_TOKEN=your_github_personal_access_token"
  echo "GIT_USER_NAME=your_github_id"
  echo "GIT_USER_EMAIL=your_github_registered_email"
  exit 1
fi

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

add_to_rc 'alias code="code --no-sandbox"'
add_to_rc 'alias venv="source venv/bin/activate"'
add_to_rc "git config --global user.name $GIT_USER_NAME"
add_to_rc "git config --global user.email $GIT_USER_EMAIL"
add_to_rc "export GITHUB_TOKEN=$GITHUB_TOKEN"

#### Github Pages Local Build support
echo "=== GitHub pages build tools  ==="
add_to_rc "# Ruby Gem Path"
add_to_rc 'export GEM_HOME="$HOME/gems"'
add_to_rc 'export PATH="$HOME/gems/bin:$PATH"'
echo "=== Gem install starting, thinking... ==="
gem install jekyll bundler

# Java VSCode extensions
code --install-extension vscjava.vscode-java-pack --pre-release
code --install-extension redhat.java --pre-release
code --install-extension vscjava.vscode-java-debug --pre-release
code --install-extension vscjava.vscode-java-test --pre-release

# GitHub VSCode extensiions
code --install-extension github.vscode-github-actions
code --install-extension eamodio.gitlens

# Python VSCode Extensions
code --install-extension ms-python.python
code --install-extension ms-python.vscode-python-pack
code --install-extension ms-python.vscode-pylance

# Jupyter VSCode Extension
code --install-extension ms-toolsai.jupyter