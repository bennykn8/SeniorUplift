FROM python

# Update and install system packages
RUN apt-get update && apt-get install -y \
    python3 \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip3 install --upgrade pip

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

CMD ["/bin/bash"]