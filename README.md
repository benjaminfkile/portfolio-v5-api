

# Portfolio Content API with Video Streaming (Complete Project)

This is a fully functional **Portfolio Content API** built with **Node.js**, **Express**, **PostgreSQL**, and **Amazon S3**. It serves portfolio website content such as about info, portfolio items, skills, and timeline entries, and streams video/media assets directly from Amazon S3 buckets.

---

## Features

- REST API endpoints serving portfolio content:
  - About section text
  - Portfolio projects with associated tech icons
  - Skill items with icons
  - Timeline items for career/events
- Streaming media (video, audio) from Amazon S3 buckets efficiently using byte-range streaming
- Secure AWS S3 access using environment credentials
- PostgreSQL database access using Knex query builder
- Error handling and robust Express middleware setup
- Lightweight and production-ready server setup with CORS, helmet, and morgan logging

---

## Tech Stack

- Node.js + Express
- PostgreSQL (Knex.js)
- Amazon S3 (AWS SDK + custom streaming)
- TypeScript
- Middleware: CORS, Helmet, Morgan

---

## Installation & Setup

1. Clone the repository:

```bash
git clone git@github.com:benjaminfkile/portfolio-v5-api.git
cd portfolio-v5-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the following variables:

```env
PORT=8000
DATABASE_URL=postgres://user:password@host:port/database
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
S3_BUCKET_NAME=your_s3_bucket_name
NODE_ENV=development
```

4. Prepare your PostgreSQL database with tables:

- `about`
- `portfolio_items`
- `skill_items`
- `timeline_items`
- `tech_icons`

---

## Database Schema Details

### Table: `about`

| Column    | Type        | Constraints         | Description                     |
|-----------|-------------|---------------------|---------------------------------|
| id        | SERIAL      | PRIMARY KEY         | Unique identifier               |
| text      | TEXT        | NOT NULL            | About section text content      |

---

### Table: `portfolio_items`

| Column          | Type        | Constraints             | Description                                      |
|-----------------|-------------|-------------------------|-------------------------------------------------|
| id              | SERIAL      | PRIMARY KEY             | Unique identifier                               |
| title           | VARCHAR(255)| NOT NULL                | Project title                                   |
| intro           | TEXT        |                         | Short introduction                             |
| description     | TEXT        |                         | Full project description                       |
| file_name       | VARCHAR(255)|                         | Filename of media/resource                      |
| url             | TEXT        |                         | Link to live project or demo                    |
| repo            | TEXT        |                         | Link to repository                              |
| media_type      | VARCHAR(50) |                         | Media type (video, image, etc.)                 |
| playback_rate   | FLOAT       |                         | Playback rate for media                         |
| transform_value | VARCHAR(255)|                         | CSS transform values or similar                  |
| order           | INT         |                         | Sort order for display                          |
| tech_icons      | INT[]       |                         | Array of associated tech icon IDs (foreign keys) |

---

### Table: `tech_icons`

| Column     | Type          | Constraints          | Description               |
|------------|---------------|----------------------|---------------------------|
| icon_id    | SERIAL        | PRIMARY KEY          | Unique icon identifier    |
| icon_source| VARCHAR(255)  | NOT NULL             | URL or path to icon image |

---

### Table: `skill_items`

| Column     | Type          | Constraints          | Description                    |
|------------|---------------|----------------------|--------------------------------|
| id         | SERIAL        | PRIMARY KEY          | Unique skill item ID          |
| name       | VARCHAR(255)  | NOT NULL             | Skill name                   |
| description| TEXT          |                      | Optional description          |
| icon_id    | INT           | FOREIGN KEY          | Reference to `tech_icons.icon_id` |
| order      | INT           |                      | Sort order                   |

---

### Table: `timeline_items`

| Column    | Type          | Constraints          | Description                      |
|-----------|---------------|----------------------|---------------------------------|
| id        | SERIAL        | PRIMARY KEY          | Unique timeline event ID        |
| title     | VARCHAR(255)  | NOT NULL             | Title of event or milestone     |
| description| TEXT         |                      | Details about the event         |
| date      | DATE          |                      | Date of event                   |
| order     | INT           |                      | Sort order                     |

---

## Running the Server

```bash
npm start
```

Server will run on the port defined in `.env` (default 8000) and be accessible at `http://localhost:<PORT>`.

---

## API Endpoints

### Content API

- `GET /api/portfolio-content/`

Returns JSON containing all portfolio content:

```json
{
  "content": {
    "about": "About text here",
    "portfolioItems": [ ... ],
    "skillItems": [ ... ],
    "timelineItems": [ ... ]
  },
  "error": false,
  "errorMsg": {}
}
```

### Media Streaming API

- `GET /api/media?key=<s3-object-key>`

Streams media content directly from your configured S3 bucket using byte-range requests for efficient playback.

---

## Streaming Implementation

The API uses a custom streaming solution leveraging the AWS SDK and `s3-readstream` library (or a custom stream class) to:

- Verify S3 object existence and metadata  
- Stream media content in 5MB chunks for smooth playback  
- Support byte-range requests for partial content streaming

---

## Notes

- This project is production-ready and can be used as a base to build your own portfolio backend.  
- Feel free to adapt and extend it to your own needs.  
- Ensure your AWS credentials and bucket policies allow secure access to media files.  
- Properly configure your database schema and seed content accordingly.
