#!/bin/bash

# Verify the installation and check the Python version
python --version
bundle --version

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate
git config --global user.name jm1021
git config --global user.email jmort1021@gmail.com

# Install the required Python packages
pip install -r requirements.txt
bundle install

