# La Silla AI: Intelligent News Assistant

![La Silla AI Logo](https://example.com/la-silla-ai-logo.png)

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [Performance and Scalability](#performance-and-scalability)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

La Silla AI is a cutting-edge, AI-powered news assistant that seamlessly integrates with La Silla Vacía, a prominent Colombian news outlet. This sophisticated application harnesses the power of artificial intelligence to provide users with real-time, context-aware responses to their news queries across various categories.

## Key Features

- **AI-Driven News Insights**: Leverage state-of-the-art AI to obtain in-depth information on the latest news.
- **Category-Specific Intelligence**: Tailor your news experience with category-focused queries and responses.
- **Adaptive User Interface**: Seamlessly switch between light and dark modes for optimal viewing comfort.
- **Interactive Conversation History**: Engage with a dynamic chat interface, complete with save/unsave functionality for important insights.
- **Rich Content Rendering**: Experience enhanced readability with Markdown-rendered responses.

## Technology Stack

- **Frontend**: React, Next.js, TypeScript
- **UI Components**: shadcn/ui, Lucide React
- **AI Integration**: Azure AI Inference
- **State Management**: React Hooks
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/la-silla-ai.git
   cd la-silla-ai
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Configuration

1. Create a `.env.local` file in the project root:
   ```
   touch .env.local
   ```

2. Add the following environment variables:
   ```
   GITHUB_TOKEN=your_github_personal_access_token
   AZURE_AI_ENDPOINT=your_azure_ai_endpoint
   AZURE_AI_KEY=your_azure_ai_key
   ```

## Usage Guide

1. Launch the development server:
   ```
   npm run dev
   ```

2. Navigate to `http://localhost:3000` in your web browser.

3. Select a news category from the dropdown menu.

4. Enter your query in the input field and submit.

5. Explore AI-generated responses and utilize the intuitive UI features for an enhanced experience.

## Architecture

La Silla AI follows a modern, scalable architecture:

- **Server-Side Rendering (SSR)**: Utilizes Next.js for improved performance and SEO.
- **API Routes**: Leverages Next.js API routes for serverless function deployment.
- **AI Integration**: Employs Azure AI Inference for sophisticated natural language processing.
- **Responsive Design**: Implements a mobile-first approach using Tailwind CSS for seamless cross-device compatibility.

## Performance and Scalability

- **Optimized Bundle Size**: Employs code splitting and lazy loading for faster initial load times.
- **Caching Strategy**: Implements intelligent caching mechanisms for frequently accessed data.
- **Serverless Architecture**: Utilizes serverless functions for cost-effective scaling during peak usage.

## Contributing

We welcome contributions to La Silla AI! Please refer to our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [La Silla Vacía](https://www.lasillavacia.com/) for providing the news content.
- [Azure AI](https://azure.microsoft.com/en-us/services/cognitive-services/) for powering our AI capabilities.
- [shadcn/ui](https://ui.shadcn.com/) for the sleek UI components.

---

For more information, please contact our [support team](mailto:support@lasillaai.com) or visit our [official website](https://www.lasillaai.com).


