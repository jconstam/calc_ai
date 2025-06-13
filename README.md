# Calculator Web App

A modern, feature-rich calculator web application built with HTML, CSS, and JavaScript. The calculator supports basic arithmetic operations, trigonometric functions, and keyboard input.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Trigonometric functions (sin, cos, tan)
- Keyboard support
- Responsive design
- Live reload during development

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed on your system
- PowerShell (for Windows users)

## Project Structure

```
calculator/
├── src/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # CSS styles
│   ├── script.js       # Main JavaScript file
│   └── calculator.js   # Calculator logic
├── tests/              # Test files
├── Dockerfile.dev      # Development Docker configuration
├── Dockerfile.test     # Testing Docker configuration
└── start-dev.ps1       # Development startup script
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd calculator
   ```

2. **Start the development server:**
   ```powershell
   .\start-dev.ps1
   ```
   This will:
   - Build the development Docker image
   - Start the live-server
   - Make the calculator available at http://127.0.0.1:8081/

3. **Access the calculator:**
   Open your browser and navigate to http://127.0.0.1:8081/

## Development

### Running Tests

To run the test suite:

```bash
docker build -t calculator-test -f Dockerfile.test .
docker run calculator-test
```

### Making Changes

1. The development server includes live reload, so any changes to the files will automatically refresh the browser.
2. All source files are in the `src` directory.
3. Test files are in the `tests` directory.

## Keyboard Support

The calculator supports keyboard input:
- Numbers: 0-9
- Operations: +, -, *, /
- Enter: Calculate result
- Escape: Clear
- Backspace: Delete last digit

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
