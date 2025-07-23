<p align="center">
  <img   src="https://github.com/user-attachments/assets/7c9fce1f-5c8f-4866-bc4d-494b688d2870" alt="Gradient Generator Logo" width="150">
</p>

<h1 align="center">Locklify</h1>

<p align="center">
  Your modern and secure companion for encrypting and decrypting text.
</p>

<p align="center">
  <a href="https://locklify.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-View_Here-blue?style=for-the-badge&logo=vercel" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Project Status">
</p>

---

## 🌟 About the Project

**Locklify** is a web application designed to provide a simple yet robust solution for your text privacy needs. It lets users **encrypt and decrypt messages** using a **secret password**, ensuring that only those with the correct key can access the information. Forget complex encryption; Locklify makes it accessible with an intuitive user interface and a design that merges modern functionality with a **cyberpunk and neumorphism-inspired aesthetic**.


## 🚀 Technologies Used

Locklify is built using a modern web development stack focused on performance, security, and developer experience:

* **React**: A powerful JavaScript library for building dynamic and reusable user interfaces.
* **Vite**: A lightning-fast build tool and development server that offers instant hot module replacement and optimized builds.
* **Next.js**: Framework basado en React que permite SSR, rutas basadas en archivos y API Routes integradas.
* **TypeScript**: A strongly-typed superset of JavaScript that helps catch bugs early and improve code maintainability.
* **Tailwind CSS**: A utility-first CSS framework that allows for rapid UI development with a consistent and responsive design system.
* **shadcn/ui**: A collection of beautifully designed and accessible React components built with Radix UI and Tailwind CSS.
* **Node.js**: Used for server-side logic, including secure operations and cryptographic processing.
* **Vercel Functions**: Serverless functions deployed on Vercel to handle backend logic like token generation, validation, and secure data handling.
* **Node.js Crypto Module**: Provides cryptographic functionality such as encryption, decryption, hashing, and secure random*


---

## ✨ Key Features

* **Secure Encryption and Decryption**: Implements the **AES-256-CBC** algorithm, a robust standard, with **PBKDF2** (Password-Based Key Derivation Function 2) key derivation using a **unique cryptographic `salt`** for each encryption operation, protecting against rainbow table attacks.
* **Intuitive User Interface**: Clean and responsive design, easy to navigate, ensuring a smooth user experience on any device.
* **Futuristic Aesthetic**: A distinctive visual style with subtle neumorphism elements, dark colors, and neon accents, complemented by a **dynamic star background** for a "wow" factor.
* **Modular Architecture**: Built with **reusable components (`shadcn/ui`)** and a well-organized project structure, facilitating easy maintenance and future expansions.
* **Serverless Functions (Backend)**: Sensitive encryption and decryption operations run on **Vercel serverless functions**, meaning the security logic resides on the server, not in the client's browser.
* **Quick Result Copy**: A dedicated button to instantly copy encrypted or decrypted text to the clipboard.

---

## 🚀 Getting Started (Installation)

Follow these steps to get a local copy of Locklify up and running.

### Prerequisites

Make sure you have the following installed on your system:

* [**Node.js**](https://nodejs.org/) (version 18 or higher recommended)
* [**npm**](https://www.npmjs.com/) (comes with Node.js)
* [**Vercel CLI**](https://vercel.com/download) (for Vercel project management and local serverless function development):
    ```bash
    npm install -g vercel
    ```

### Installation

1.  **Navigate to your preferred working directory** (e.g., `C:\Users\<YourUser>\Desktop\Apps\Locklify`):
    ```bash
    cd C:\Users\<YourUser>\Desktop\Apps\Locklify
    ```
2.  **Clone the repository** or make sure your `locklify-app` project is in the desired location:

    ```bash
    # If you're starting from scratch and the repository is already on GitHub
    git clone [https://github.com/your-username/locklify-app.git](https://github.com/your-username/locklify-app.git)
    cd locklify-app
    ```
    *(If you already have the `locklify-app` folder inside `Locklify`, just navigate to it: `cd locklify-app`)*

3.  **Install project dependencies:**

    ```bash
    npm install
    ```

4.  **Ensure `shadcn/ui` configuration is correct:**
    If you haven't done so, or to verify the setup (especially the `@/components` and `@/lib/utils` aliases):
    ```bash
    npx shadcn-ui@latest init
    ```
    Confirm the options to match your project configuration (`src/index.css`, `@/components`, `@/lib/utils`, etc.).

5.  **Add necessary UI components:**
    ```bash
    npx shadcn-ui@latest add button input textarea
    ```

6.  **Verify and adjust `tsconfig.json` and `tsconfig.node.json`** files in your project root. They should be configured for correct module and alias resolution (`"baseUrl": "."`, `"paths": { "@/*": ["./src/*"] }` in `tsconfig.json`, and `"composite": true`, **without** `"noEmit": true` in `tsconfig.node.json` if it exists).

7.  **Prepare background image files (optional):**
    For the star background effect, you'll need two simple transparent PNG images in your `public/` folder:
    * `public/stars.png` (a dark background with scattered white dots to simulate stars).
    * `public/twinkling.png` (a transparent background with brighter, varied white dots, for the twinkling effect).

---

## 💡 Application Usage

1.  **Text Input**: Enter the text you want to encrypt or decrypt in the main text area.
2.  **Password (Key)**: Enter the secret password that will serve as the key for operations. Make sure to remember this password, as it's crucial for decrypting your text. You can use the eye icon to show/hide the password.
3.  **Encrypt**: Click the "Encrypt" button to encrypt your text. The result will appear in the output text area below.
4.  **Decrypt**: Enter the encrypted text (making sure it includes the `IV:Salt:` prefixes) and the correct password, then click "Decrypt". The original text will appear if the operation is successful.
5.  **Copy Result**: Use the "Copy Result" button to copy the encrypted or decrypted text to your clipboard.

---

## 🚀 Deployment to Vercel

Locklify is optimized for effortless deployment to Vercel.

1.  **Log in to Vercel CLI:**
    ```bash
    vercel login
    ```
    Follow the prompts in your browser to authenticate.

2.  **Deploy your project:**
    ```bash
    vercel --prod
    ```
    Vercel will guide you through the process.
    * When asked if you want to link to an existing project, select **`n` (no)** to create a new Vercel project.
    * Name your project (e.g., `locklify-app`).
    * When asked if you want to use the `Deployment Protection` settings, select **`n` (no)** to make your application publicly accessible.

    Vercel will automatically detect your Vite configuration and serverless functions, then deploy the application. Once finished, it will provide you with the URL to your live application.

---

## 🤝 Contributions

Contributions are welcome and encouraged! If you find bugs, have ideas for new features, or want to improve the code, feel free to:

1.  Open an `Issue` to report a problem or suggest an enhancement.
2.  Fork the repository.
3.  Create a new branch (`git checkout -b feature/new-feature`).
4.  Make your changes and `commit` them (`git commit -m 'feat: adds new feature'`).
5.  `Push` to your branch (`git push origin feature/new-feature`).
6.  Open a `Pull Request` detailing your changes.

---
