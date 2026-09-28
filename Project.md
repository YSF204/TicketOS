AI Project Management Workspace

## 1. Project Overview

A full-stack project management/workspace application with built-in AI features.

The main goal of this project is to build a realistic production-style application while revising and strengthening:

- React and frontend development
- Node.js / Express backend development
- TypeScript
- PostgreSQL and relational database design
- Authentication and authorization
- JWT access/refresh token flows
- RBAC
- SOLID and clean code
- Modular monolith architecture
- REST API design
- Testing
- Docker
- CI workflows
- AI API integration
- Basic security practices

This is primarily a learning/revision project. The goal is to understand the system properly and make sensible engineering decisions without over-engineering it.

---

# 2. Core Idea

Users can create or join workspaces.

A workspace contains projects.

Projects contain tasks.

Tasks can have:

- Assignees
- Status
- Priority
- Due dates
- Comments

Users can also upload project/workspace documents.

AI features can help users:

- Generate project tasks
- Summarize project progress
- Eventually answer questions about uploaded documents

High-level flow:

```text
User
 │
 ▼
React Frontend
 │
 │ HTTP / JSON
 ▼
Node.js / Express API
 │
 ├── PostgreSQL
 ├── Redis (only where useful)
 └── AI Provider APIs
       ├── OpenAI
       ├── Gemini
       └── Anthropic (optional)

The frontend never connects directly to PostgreSQL or AI providers.

3. MVP Scope
Authentication
Register
Login
Logout
Refresh access token
Password hashing with Argon2
Protected routes
Basic email verification support can be added later
One OAuth/OIDC provider can be added later
Workspaces
Create workspace
View workspaces
Invite/add members
Remove members
Change member roles
Projects
Create project
View project
Update project
Delete/archive project
Add/remove project members
Tasks
Create task
Update task
Delete task
Assign task
Change status
Set priority
Set due date
Filter/search tasks
Comments
Add comment
Edit own comment
Delete own comment
Documents
Upload document
View document metadata
Delete document
Associate document with workspace/project

Actual file storage can initially use a simple storage provider. S3-compatible storage can be introduced later if needed.

AI

Initial AI features:

Generate tasks from a project description
Summarize project progress

Later:

Document Q&A
RAG / embeddings if there is a real need

Do not start with RAG.

4. Architecture
Architecture Style

Use a Modular Monolith.

There will be one backend application, but the code will be separated into clear modules.

Example:

backend/
└── src/
    ├── modules/
    │   ├── auth/
    │   ├── users/
    │   ├── workspaces/
    │   ├── projects/
    │   ├── tasks/
    │   ├── comments/
    │   ├── documents/
    │   └── ai/
    │
    ├── infrastructure/
    │   ├── database/
    │   └── redis/
    │
    ├── shared/
    │   ├── errors/
    │   ├── middleware/
    │   ├── validation/
    │   └── utils/
    │
    └── app.ts

The exact folder structure can change during implementation if there is a good reason.

5. Frontend / Backend Communication

Communication will use REST APIs over HTTP.

React
  │
  │ POST /api/projects/:projectId/tasks
  ▼
Express API
  │
  ├── Authentication
  ├── Authorization
  ├── Validation
  ├── Task Service
  │
  ▼
PostgreSQL
  │
  ▼
JSON Response
  │
  ▼
React

Example:

POST /api/projects/123/tasks
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "title": "Create login page",
  "priority": "HIGH",
  "assignedTo": "user-id",
  "dueDate": "2026-10-10"
}

The backend should:

Verify authentication
Identify the user
Check workspace/project permissions
Validate request data
Execute business logic
Save the task
Return a structured response
6. Authentication

Use a hybrid authentication approach.

Access Token
JWT
Short-lived
Example: 15 minutes
Stateless
Used for normal API requests
Refresh Token
Long-lived
Stored server-side as a hash in PostgreSQL
Can be revoked
Rotate refresh tokens when they are used

Example:

Login
 │
 ▼
Verify email/password
 │
 ├── Access JWT
 └── Refresh Token

When the access token expires:

Frontend
 │
 ▼
POST /auth/refresh
 │
 ▼
Backend checks refresh token
 │
 ├── valid → issue new access token
 └── invalid/revoked → require login

Do not store JWT access tokens in the database.

Redis is not required for JWT storage.

Redis can be added later for:

Rate limiting
Caching
Temporary data
Distributed locks
Other real use cases
7. Database

Use PostgreSQL.

The domain is naturally relational:

User
 │
 ├── WorkspaceMember ── Workspace
 │                         │
 │                         ├── Projects
 │                         │     │
 │                         │     └── Tasks
 │                         │           │
 │                         │           └── Comments
 │                         │
 │                         └── Documents
 │
 └── ProjectMember ── Project

PostgreSQL is also useful for practicing:

Foreign keys
Constraints
Transactions
Joins
Indexes
Aggregations
Complex queries
JSONB when flexibility is needed
8. Main Database Entities
User
User
- id
- email
- password_hash
- first_name
- last_name
- avatar_url
- email_verified
- created_at
- updated_at
Workspace
Workspace
- id
- name
- slug
- owner_id
- created_at
- updated_at
WorkspaceMember

Join table between users and workspaces.

WorkspaceMember
- id
- workspace_id
- user_id
- role
- joined_at

A user can belong to multiple workspaces.

Example:

Yousef
 ├── Workspace A → OWNER
 └── Workspace B → MEMBER

The role belongs to the relationship, not directly to the user.

Project
Project
- id
- workspace_id
- name
- description
- status
- created_by
- created_at
- updated_at
ProjectMember
ProjectMember
- id
- project_id
- user_id
- role
- joined_at

This is only needed if projects have their own membership/permissions.

Task
Task
- id
- project_id
- title
- description
- status
- priority
- created_by
- assigned_to
- due_date
- created_at
- updated_at
Comment
Comment
- id
- task_id
- user_id
- content
- created_at
- updated_at
Document
Document
- id
- workspace_id
- project_id
- uploaded_by
- name
- file_url
- file_type
- file_size
- created_at
RefreshToken
RefreshToken
- id
- user_id
- token_hash
- expires_at
- revoked_at
- created_at
AIRequest

Used to keep basic information about AI usage.

AIRequest
- id
- user_id
- workspace_id
- provider
- model
- purpose
- input_tokens
- output_tokens
- status
- created_at

The schema can be changed after the actual AI implementation is understood.

9. Relationships
User
 │
 ├──< WorkspaceMember >── Workspace
 │                              │
 │                              ├──< Project
 │                              │      │
 │                              │      └──< Task
 │                              │             │
 │                              │             └──< Comment
 │                              │
 │                              └──< Document
 │
 ├──< ProjectMember >── Project
 │
 ├──< RefreshToken
 │
 └──< AIRequest

Important relationships:

User ↔ Workspace = many-to-many through WorkspaceMember
Workspace → Project = one-to-many
Project → Task = one-to-many
Task → Comment = one-to-many
User ↔ Project = many-to-many through ProjectMember
Workspace → Document = one-to-many
User → RefreshToken = one-to-many
User → AIRequest = one-to-many
10. Roles and Permissions

Start with simple roles.

Workspace Roles
OWNER

Can:

Manage workspace
Manage members
Create/delete projects
Manage workspace documents
Use all workspace features
ADMIN

Can:

Manage most workspace resources
Manage members
Create/update projects

Cannot:

Delete the workspace
Transfer ownership unless explicitly implemented
MEMBER

Can:

View workspace
Work on projects they have access to
Create/update tasks according to project permissions
Comment
Use normal project features
Project Roles

If project-level roles are implemented:

PROJECT_ADMIN
Manage project
Manage project members
Manage tasks
PROJECT_MEMBER
View project
Work on assigned/allowed tasks
Comment

Permissions should be enforced on the backend.

The frontend can hide buttons, but hiding a button is NOT authorization.

11. Authorization Model

Every protected operation should follow roughly:

Request
  │
  ▼
Authenticate user
  │
  ▼
Load relevant resource
  │
  ▼
Check user's role/membership
  │
  ├── allowed → continue
  └── denied → 403 Forbidden

Example:

DELETE /api/workspaces/:id

User authenticated?
        │
       YES
        │
Is user workspace OWNER?
        │
   ┌────┴────┐
  YES        NO
   │          │
Delete       403

Never trust IDs supplied by the frontend.

12. API Structure

Use a consistent API prefix:

/api

Possible endpoint structure:

Auth
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
Workspaces
POST   /api/workspaces
GET    /api/workspaces
GET    /api/workspaces/:workspaceId
PATCH  /api/workspaces/:workspaceId
DELETE /api/workspaces/:workspaceId
Members
GET    /api/workspaces/:workspaceId/members
POST   /api/workspaces/:workspaceId/members
PATCH  /api/workspaces/:workspaceId/members/:userId
DELETE /api/workspaces/:workspaceId/members/:userId
Projects
POST   /api/workspaces/:workspaceId/projects
GET    /api/workspaces/:workspaceId/projects
GET    /api/projects/:projectId
PATCH  /api/projects/:projectId
DELETE /api/projects/:projectId
Tasks
POST   /api/projects/:projectId/tasks
GET    /api/projects/:projectId/tasks
GET    /api/tasks/:taskId
PATCH  /api/tasks/:taskId
DELETE /api/tasks/:taskId
Comments
GET    /api/tasks/:taskId/comments
POST   /api/tasks/:taskId/comments
PATCH  /api/comments/:commentId
DELETE /api/comments/:commentId
Documents
POST   /api/workspaces/:workspaceId/documents
GET    /api/workspaces/:workspaceId/documents
DELETE /api/documents/:documentId
AI
POST /api/ai/projects/:projectId/generate-tasks
POST /api/ai/projects/:projectId/summarize

The final API should be adjusted as implementation progresses.

13. AI Architecture

Use a simple provider abstraction.

AIProvider
    │
    ├── OpenAIProvider
    ├── GeminiProvider
    └── AnthropicProvider

Application code should interact with:

ai.generate(...)

instead of directly calling OpenAI/Gemini/Anthropic everywhere.

Example conceptual interface:

AIProvider
- generate()
- generateStructured()

This allows providers to be changed without rewriting the entire application.

Do not build a complicated AI routing system initially.

No:

Model benchmarking system
Automatic provider fallback
Complex agent architecture
AI orchestration framework

unless the project later genuinely needs them.

14. AI Flow: Generate Tasks

Example:

User enters:

I want to build an e-commerce website.

Flow:

React
  │
  ▼
POST /api/ai/projects/:id/generate-tasks
  │
  ▼
Backend
  │
  ├── Authenticate
  ├── Check project access
  ├── Build prompt
  │
  ▼
AI Service
  │
  ▼
Selected AI Provider
  │
  ▼
Structured response
  │
  ▼
Validate response
  │
  ▼
Return tasks to frontend

Initially, generated tasks do not have to be automatically inserted into the database.

The UI can show:

Generated Tasks

[ ] Create product database
[ ] Build product listing page
[ ] Build shopping cart
[ ] Add checkout
[ ] Add authentication

        [Add Selected Tasks]

This gives the user control.

15. AI Flow: Project Summary

The backend can gather:

Project information
Task status
Task priorities
Recent comments
Relevant document information

Then send a controlled amount of context to the AI provider.

Example output:

Project Progress

Completed: 8 tasks
In Progress: 3 tasks
Blocked: 1 task
Remaining: 5 tasks

Summary:
The backend is mostly complete. Frontend authentication
is still in progress. One task is blocked because...

The AI should not be given unnecessary data.

16. Documents

Initial version:

User uploads file
       │
       ▼
Backend validates file
       │
       ▼
File storage
       │
       ▼
Document record in PostgreSQL

Store metadata in PostgreSQL:

File name
File type
File size
Storage URL
Uploader
Workspace/project
Created time

The actual file should not be stored directly inside PostgreSQL unless there is a specific reason.

Document Q&A can initially use extracted text without implementing embeddings.

RAG/pgvector can be considered later.

17. Validation

Validate incoming data on the backend.

Examples:

Register
- Valid email
- Password requirements
- Required name

Create project
- Name required
- Description length

Create task
- Title required
- Valid status
- Valid priority
- Valid assigned user

Upload document
- Allowed file type
- Maximum size

Never rely only on frontend validation.

18. Error Handling

Use consistent API errors.

Example:

{
  "success": false,
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "Project not found"
  }
}

Possible status codes:

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
429 Too Many Requests
500 Internal Server Error

Avoid exposing internal errors or stack traces to users.

19. Security Essentials

Implement:

Argon2 password hashing
Short-lived access JWT
Hashed refresh tokens
Refresh token rotation
Backend authorization
Input validation
Rate limiting where appropriate
CORS configuration
Security headers
File upload validation
Environment variables for secrets
No AI API keys in frontend
No database credentials in frontend
Parameterized queries / ORM protections
Proper error handling

Later:

Email verification
Password reset
OAuth/OIDC
Audit logs
More advanced abuse protection
20. Testing Strategy

Do not try to test everything immediately.

Use three levels.

Unit Tests

Test isolated business logic.

Examples:

Permission checking
Task validation
Token utilities
AI response parsing
Integration Tests

Test API + database behavior.

Examples:

Register user
Login
Create workspace
Add member
Create project
Create task
Check permissions
E2E Test

At least one complete flow:

Register
  ↓
Login
  ↓
Create workspace
  ↓
Create project
  ↓
Create task
  ↓
Assign task
  ↓
Add comment

The exact testing tools can be decided when implementation starts.

21. Docker

Development environment should eventually be reproducible with Docker Compose.

Possible services:

frontend
backend
postgres
redis

Redis is optional initially.

Example:

docker-compose.yml

frontend
backend
postgres
redis

The application should also work locally without Docker where practical.

22. CI

Basic CI pipeline:

Push / Pull Request
       │
       ▼
Install dependencies
       │
       ▼
Lint
       │
       ▼
Type check
       │
       ▼
Run tests
       │
       ▼
Build

Do not add complicated deployment infrastructure at the beginning.

No Kubernetes unless there is a real reason to practice it later.

23. Development Strategy

Build the project using vertical slices.

Do NOT:

Build the entire frontend first
Then build the entire backend
Then try to connect everything at the end

Instead:

Choose feature
     ↓
Define API/data
     ↓
Build backend
     ↓
Build frontend
     ↓
Integrate
     ↓
Test
     ↓
Finish feature
     ↓
Next feature

Example:

Authentication
    ↓
Workspace
    ↓
Projects
    ↓
Tasks
    ↓
Comments
    ↓
Documents
    ↓
AI

This keeps the application working throughout development.

24. Suggested Implementation Order
Phase 1 — Project Setup
Repository setup
TypeScript
React
Express
PostgreSQL
Environment configuration
Basic folder structure
Docker setup
Phase 2 — Authentication
User model
Registration
Login
Password hashing
Access JWT
Refresh tokens
Logout
Auth middleware
Current-user endpoint
Phase 3 — Workspaces
Workspace model
WorkspaceMember
Create workspace
List workspaces
Workspace details
Member management
Workspace authorization
Phase 4 — Projects
Project model
Project CRUD
Project membership
Project authorization
Phase 5 — Tasks
Task CRUD
Assignment
Status
Priority
Due dates
Filtering
Pagination
Phase 6 — Comments
Create comment
Edit comment
Delete comment
Permission checks
Phase 7 — Documents
Upload
Storage
Metadata
Delete
Access control
Phase 8 — AI
AIProvider interface
OpenAI integration
Second provider if useful
Generate tasks
Project summary
AI request logging
Phase 9 — Quality
Unit tests
Integration tests
E2E flow
Error handling improvements
Security review
Performance review
Phase 10 — CI / Finalization
CI pipeline
Docker Compose cleanup
Documentation
Environment setup instructions
Production build
25. Things to Learn During the Project

This project should be used to deliberately practice:

Backend
REST API design
Middleware
Controllers
Services
Repositories/data access
Dependency injection where useful
Error handling
Validation
Transactions
Pagination
Filtering
Indexing
Database
PostgreSQL
Relationships
Foreign keys
Constraints
Transactions
Joins
Indexes
Migrations
Query optimization
Authentication
Password hashing
JWT
Access tokens
Refresh tokens
Token rotation
Sessions vs tokens
OAuth/OIDC later
Frontend
React
Routing
Forms
API calls
Authentication state
Protected routes
Loading/error states
Tables/lists
Filters
Pagination
Component organization
Architecture
SOLID
Separation of concerns
Modular monolith
Dependency direction
Service boundaries
DTOs
Repository patterns where useful
DevOps
Docker
Docker Compose
Environment variables
CI
Linting
Testing
Build pipelines
AI
AI API integration
Structured output
Prompt design
Provider abstraction
Token usage
AI error handling
Context management
RAG later
26. Important Engineering Rules

Keep these principles throughout the project.

1. Do not over-engineer

If a simple solution works, use it.

2. Backend owns authorization

The frontend cannot be trusted for permissions.

3. Keep business logic out of controllers

Controllers should mainly handle:

Request
→ Validation
→ Service
→ Response
4. Keep modules independent

For example:

Task module

should not randomly access internal code from:

AI module

Use clear interfaces/services.

5. Database constraints matter

Do not rely only on application code to maintain data integrity.

6. Secrets stay server-side

Never expose:

Database credentials
JWT secrets
AI API keys
Storage secrets

to the frontend.

7. Build working features before abstractions

Do not create abstractions just because they might be useful someday.

8. Refactor after understanding the real problem

The architecture can evolve.

27. Things Deliberately Deferred

These are NOT part of the initial MVP unless they become useful:

Microservices
Kubernetes
Event-driven architecture
Kafka
Complex message queues
Full RAG pipeline
Vector database
Advanced AI agents
AI provider routing/fallback system
WebSockets / real-time collaboration
Complex notification system
Advanced observability stack
Multi-region deployment
Advanced caching strategy
Full billing/subscription system
Complex analytics

These can be added later as separate learning exercises.

28. Definition of Done for MVP

The MVP should allow:

User
 ↓
Register / Login
 ↓
Create Workspace
 ↓
Add Member
 ↓
Create Project
 ↓
Create Tasks
 ↓
Assign Tasks
 ↓
Change Status/Priority
 ↓
Comment
 ↓
Upload Document
 ↓
Use AI to Generate Tasks
 ↓
Use AI to Summarize Project

And the system should have:

Working authentication
Backend authorization
PostgreSQL database
Clean module structure
Basic validation
Error handling
Tests
Docker development setup
CI pipeline
Secure handling of secrets
29. Current Decision Log

Keep this section updated whenever an important architecture decision is made.

Decision	Choice	Reason
Architecture	Modular Monolith	Learn structure without microservice complexity
Database	PostgreSQL	Relational domain + SQL practice
Auth	JWT access + stateful refresh tokens	Good balance of stateless API and revocable sessions
Password hashing	Argon2	Modern password hashing
Frontend/backend strategy	Vertical slices	Faster feedback and integration
AI architecture	Provider abstraction	Avoid coupling application to one AI provider
AI initial scope	Task generation + summaries	Useful without RAG complexity
Redis	Optional	Only introduce it for a real use case
RAG	Deferred	Not necessary for MVP
Microservices	Deferred	Too much complexity for this project
30. Open Questions

Decide these during implementation rather than forcing every decision now:

Which ORM/query tool should be used?
Exact React state-management approach
Exact UI component library
Exact file-storage provider
Whether ProjectMember is needed in MVP
Exact OAuth/OIDC provider
Exact testing frameworks
Whether Redis is needed from day one
Exact deployment platform
Exact AI models/providers
Email provider for verification/reset flows

When making these decisions, document the reason here.

31. Project Philosophy

The goal is not to make the biggest application possible.

The goal is to build a realistic application while understanding:

WHY are we using this?
WHY is the data structured this way?
WHY does this API exist?
WHY does this layer exist?
WHY is this security measure necessary?
WHAT are the tradeoffs?

Prefer:

Simple + Correct + Understandable

over:

Complex + "Production-looking" + Unnecessary

The project should become more advanced only when there is a clear reason to introduce the complexity.