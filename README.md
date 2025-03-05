# Task Management Application – Solution Approach
## Overview
This application presents tasks in two different styles — a vertical list and a horizontal grid. Users can switch between these styles using a UI toggle. The application also supports multiple projects, and switching between them retains the selected display preference.

Additionally, the system features recurring tasks, where a new task is automatically created every 2 minutes for each project. The front-end dynamically updates when new tasks appear.

The application is built with Ruby on Rails as a full-stack framework, using GraphQL for API communication and MySQL as the database, Frontend has built using ReactJS.

## Technical Stack
- **Backend & Frontend**: Ruby on Rails (React is embedded within the Rails app)
- **Database**: MySQL
- **API**: GraphQL
- **Task Scheduling**: Cron jobs (using whenever gem)

## Implementation Approach
### 1. Data Models
The application consists of two main models:

- **Project:** Represents a project containing multiple tasks.
- **Task:** Represents individual tasks, each belonging to a specific project.

## 2. GraphQL API

The backend exposes a GraphQL API that serves two main queries:

- **Fetching Projects:** Retrieves the complete list of projects without any filtering.

- **Fetching Tasks:** Retrieves tasks associated with a specific project, requiring a `projectId` as a parameter.

This structured API ensures that tasks are always contextually linked to their respective projects, improving query efficiency and maintaining logical separation.

## 3. Frontend Integration (React within Rails)

The React frontend is embedded within the Rails application using the root element inside the `home/index.html` template. The integration follows these key steps:

- **Meta tag configuration:** The GraphQL API endpoint is dynamically set using a `<meta>` tag, allowing the frontend to automatically adapt to different environments.
- **Client setup:** The Apollo Client is configured to interact with the GraphQL API, utilizing an `InMemoryCache` for optimized performance.
- **React mounting:** The React application is rendered inside the #root div using `ReactDOM.createRoot`, ensuring a modern, efficient rendering approach.

## 4. UI Components

The user interface follows a modular approach, leveraging styled-components for styling and React hooks for state management. The key components include:

- **TaskManager:** Manages project selection and renders corresponding tasks.
- **Tasks:** Fetches and displays tasks dynamically based on the selected project.
- **View Mode Toggle:** Allows switching between list and grid views, persisting the choice in `localStorage`.

This approach ensures a clean separation of concerns, enhancing maintainability and reusability.

## 5. Real-Time adding tasks
Added mechanism to add new tasks in background using **Cron** with `whenever gem`

Rather than using GraphQL subscriptions, a polling mechanism is implemented (`pollInterval: 5000`). This decision was made to simplify the implementation while still ensuring near real-time updates. Polling provides a balance between up-to-date information and system efficiency without requiring WebSockets.

## Production deployment
Here's a high-level overview of the deployment process:

**Build React Assets:** First, you need to bundle your React app using esbuild. Run the build command to compile the JavaScript:
``npm run build``. This will bundle the React files, ensuring they are ready for production.

**Database Setup:** Make sure to configure your database for production. Run the database setup commands:

``RAILS_ENV=production bundle exec rake db:create db:migrate``

**Set Environment Variables**: Make sure all necessary environment variables, such as database credentials and API endpoints, are properly set in the production environment. These include:

- `DB_USER`, `DB_NAME`, `DB_PASSWORD` for the database.
- `GRAPHQL_ENDPOINT` for the GraphQL API endpoint.
