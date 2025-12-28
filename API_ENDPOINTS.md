# MiniBlog API Endpoints - Frontend Developer Guide

## Base URL
```
Development: http://localhost:3000
Production: https://your-domain.com
```

## API Prefix
All endpoints are prefixed with `/api`

---

## Table of Contents
1. [Authentication](#authentication)
2. [Users](#users)
3. [Posts](#posts)
4. [Comments](#comments)
5. [Reactions (Likes)](#reactions-likes)
6. [Saved Posts](#saved-posts)
7. [Notifications](#notifications)
8. [File Upload](#file-upload)
9. [Admin](#admin)
10. [Common Response Format](#common-response-format)
11. [Error Handling](#error-handling)

---

## Authentication

### 1. Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "display_name": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "display_name": "John Doe",
      "role": "user"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  },
  "message": "User registered successfully"
}
```

### 2. Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "display_name": "John Doe",
      "avatar_url": "http://localhost:3000/uploads/avatar.jpg",
      "role": "user"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  },
  "message": "Login successful"
}
```

### 3. Refresh Token
```http
POST /api/auth/refresh-token
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 4. Get Current User
```http
GET /api/auth/me
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "email": "john@example.com",
      "display_name": "John Doe",
      "bio": "Software Developer",
      "avatar_url": "http://localhost:3000/uploads/avatar.jpg",
      "role": "user",
      "is_active": true,
      "created_at": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

### 5. Change Password
```http
POST /api/auth/change-password
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

---

## Users

### 1. Get User Profile
```http
GET /api/users/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "display_name": "John Doe",
      "bio": "Software Developer",
      "avatar_url": "http://localhost:3000/uploads/avatar.jpg",
      "created_at": "2025-01-01T00:00:00.000Z"
    },
    "stats": {
      "posts_count": 25,
      "followers_count": 150,
      "following_count": 80
    }
  }
}
```

### 2. Update Profile
```http
PUT /api/users/:id
Authorization: Bearer {accessToken}
```

**Request Body:**
```json
{
  "display_name": "John Doe Updated",
  "bio": "Full Stack Developer",
  "avatar_url": "http://localhost:3000/uploads/new-avatar.jpg"
}
```

### 3. Follow User
```http
POST /api/users/:id/follow
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "User followed successfully"
  }
}
```

### 4. Unfollow User
```http
DELETE /api/users/:id/unfollow
Authorization: Bearer {accessToken}
```

### 5. Get User Followers
```http
GET /api/users/:id/followers?page=1&limit=20
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "followers": [
      {
        "id": "uuid",
        "username": "follower1",
        "display_name": "Follower One",
        "avatar_url": "http://localhost:3000/uploads/avatar1.jpg"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### 6. Get User Following
```http
GET /api/users/:id/following?page=1&limit=20
```

### 7. Search Users
```http
GET /api/users/search?q=john&page=1&limit=20
```

### 8. Get User's Posts
```http
GET /api/users/:id/posts?page=1&limit=20&status=published
```

### 9. Get User's Liked Posts
```http
GET /api/users/:id/liked-posts?page=1&limit=20
Authorization: Bearer {accessToken}
```

### 10. Get User's Saved Posts
```http
GET /api/users/:id/saved-posts?page=1&limit=20
Authorization: Bearer {accessToken}
```

---

## Posts

### 1. Get All Posts
```http
GET /api/posts?page=1&limit=20&sort=latest&tag=javascript
```

**Query Parameters:**
- `page` (number, default: 1): Page number
- `limit` (number, default: 20): Posts per page
- `sort` (string): `latest`, `popular`, `trending`
- `tag` (string): Filter by tag slug
- `author` (string): Filter by author username
- `status` (string): `published`, `draft` (requires auth for drafts)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "title": "Getting Started with Node.js",
        "slug": "getting-started-with-nodejs",
        "excerpt": "Learn the basics of Node.js...",
        "content": "Full content here...",
        "featured_image_url": "http://localhost:3000/uploads/cover.jpg",
        "status": "published",
        "view_count": 1250,
        "like_count": 45,
        "comment_count": 12,
        "published_at": "2025-01-15T10:30:00.000Z",
        "created_at": "2025-01-15T09:00:00.000Z",
        "author": {
          "id": "uuid",
          "username": "johndoe",
          "display_name": "John Doe",
          "avatar_url": "http://localhost:3000/uploads/avatar.jpg"
        },
        "tags": [
          {
            "id": "uuid",
            "name": "javascript",
            "slug": "javascript"
          },
          {
            "id": "uuid",
            "name": "nodejs",
            "slug": "nodejs"
          }
        ]
      }
    ]
  },
  "pagination": {
    "current_page": 1,
    "total_pages": 10,
    "total_posts": 200,
    "per_page": 20,
    "has_next": true,
    "has_prev": false
  }
}
```

### 2. Get Single Post
```http
GET /api/posts/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Getting Started with Node.js",
    "slug": "getting-started-with-nodejs",
    "excerpt": "Learn the basics of Node.js...",
    "content": "Full content here...",
    "featured_image_url": "http://localhost:3000/uploads/cover.jpg",
    "status": "published",
    "view_count": 1250,
    "like_count": 45,
    "comment_count": 12,
    "is_liked_by_user": false,
    "is_saved_by_user": false,
    "published_at": "2025-01-15T10:30:00.000Z",
    "author": {
      "id": "uuid",
      "username": "johndoe",
      "display_name": "John Doe",
      "avatar_url": "http://localhost:3000/uploads/avatar.jpg",
      "bio": "Software Developer"
    },
    "tags": [
      {
        "id": "uuid",
        "name": "javascript",
        "slug": "javascript"
      }
    ],
    "related_posts": [
      {
        "id": "uuid",
        "title": "Advanced Node.js Patterns",
        "slug": "advanced-nodejs-patterns",
        "excerpt": "...",
        "featured_image_url": "...",
        "author": {
          "username": "janedoe",
          "display_name": "Jane Doe"
        }
      }
    ]
  }
}
```

### 3. Create Post
```http
POST /api/posts
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

**Form Data:**
- `title` (string, required): Post title (1-200 chars)
- `content` (string, required): Post content (1-50000 chars)
- `excerpt` (string, optional): Short description (max 300 chars)
- `tags[]` (array, optional): Tags (1-5 tags)
- `status` (string, optional): `draft` or `published` (default: draft)
- `cover_image` (file, optional): Cover image (max 5MB)

**JavaScript Example:**
```javascript
const formData = new FormData();
formData.append('title', 'My New Post');
formData.append('content', 'This is the full content...');
formData.append('excerpt', 'Short description');
formData.append('tags[]', 'javascript');
formData.append('tags[]', 'nodejs');
formData.append('status', 'published');
formData.append('cover_image', fileInput.files[0]);

const response = await fetch('http://localhost:3000/api/posts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
  body: formData
});
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "My New Post",
    "slug": "my-new-post",
    "content": "This is the full content...",
    "excerpt": "Short description",
    "featured_image_url": "http://localhost:3000/uploads/cover-123456.jpg",
    "status": "published",
    "author": { ... },
    "tags": [ ... ]
  }
}
```

### 4. Update Post
```http
PUT /api/posts/:id
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

Same form data as Create Post.

### 5. Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Post deleted successfully",
    "post_id": "uuid"
  }
}
```

### 6. Search Posts
```http
GET /api/posts/search?query=nodejs&page=1&limit=20
```

---

## Comments

### 1. Get Post Comments
```http
GET /api/posts/:postId/comments?page=1&limit=20
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "uuid",
        "content": "Great article!",
        "created_at": "2025-01-15T12:00:00.000Z",
        "user": {
          "id": "uuid",
          "username": "commenter",
          "display_name": "Commenter Name",
          "avatar_url": "http://localhost:3000/uploads/avatar.jpg"
        },
        "replies_count": 3
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### 2. Create Comment
```http
POST /api/posts/:postId/comments
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "This is a great post!",
  "parent_comment_id": null
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "comment": {
      "id": "uuid",
      "content": "This is a great post!",
      "post_id": "uuid",
      "user_id": "uuid",
      "parent_comment_id": null,
      "created_at": "2025-01-15T12:00:00.000Z",
      "user": {
        "username": "johndoe",
        "display_name": "John Doe",
        "avatar_url": "..."
      }
    }
  },
  "message": "Comment created successfully"
}
```

### 3. Reply to Comment
```http
POST /api/comments/:commentId/reply
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "Thanks for your comment!"
}
```

### 4. Get Comment Replies
```http
GET /api/comments/:commentId/replies?page=1&limit=10
```

### 5. Update Comment
```http
PUT /api/comments/:id
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "Updated comment text"
}
```

### 6. Delete Comment
```http
DELETE /api/comments/:id
Authorization: Bearer {accessToken}
```

---

## Reactions (Likes)

### 1. Like Post
```http
POST /api/posts/:postId/like
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Post liked successfully"
  }
}
```

### 2. Unlike Post
```http
DELETE /api/posts/:postId/like
Authorization: Bearer {accessToken}
```

### 3. Get Users Who Liked Post
```http
GET /api/posts/:postId/likes?page=1&limit=20
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "username": "user1",
        "display_name": "User One",
        "avatar_url": "...",
        "liked_at": "2025-01-15T10:00:00.000Z"
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

---

## Saved Posts

### 1. Save Post
```http
POST /api/posts/:postId/save
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Post saved successfully"
  }
}
```

### 2. Unsave Post
```http
DELETE /api/posts/:postId/save
Authorization: Bearer {accessToken}
```

---

## Notifications

### 1. Get Notifications
```http
GET /api/notifications?page=1&limit=20&isRead=false
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `isRead` (boolean): Filter by read status

**Response (200):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "like",
        "is_read": false,
        "created_at": "2025-01-15T10:00:00.000Z",
        "related_user": {
          "id": "uuid",
          "username": "liker",
          "display_name": "Liker Name",
          "avatar_url": "..."
        },
        "related_post": {
          "id": "uuid",
          "title": "Post Title",
          "slug": "post-title"
        }
      }
    ]
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### 2. Get Unread Count
```http
GET /api/notifications/unread-count
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "unread_count": 5
  }
}
```

### 3. Mark Notification as Read
```http
PUT /api/notifications/:id/read
Authorization: Bearer {accessToken}
```

### 4. Mark All as Read
```http
PUT /api/notifications/mark-all-read
Authorization: Bearer {accessToken}
```

### 5. Delete Notification
```http
DELETE /api/notifications/:id
Authorization: Bearer {accessToken}
```

### 6. Delete All Notifications
```http
DELETE /api/notifications
Authorization: Bearer {accessToken}
```

---

## File Upload

### 1. Upload Avatar
```http
POST /api/upload/avatar
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

**Form Data:**
- `avatar` (file): Image file (max 5MB, types: JPEG, PNG, GIF, WebP)

**JavaScript Example:**
```javascript
const formData = new FormData();
formData.append('avatar', fileInput.files[0]);

const response = await fetch('http://localhost:3000/api/upload/avatar', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
  body: formData
});
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "avatar_url": "http://localhost:3000/uploads/avatar-123456.jpg",
    "user": {
      "id": "uuid",
      "username": "johndoe",
      "avatar_url": "http://localhost:3000/uploads/avatar-123456.jpg"
    }
  },
  "message": "Avatar uploaded successfully"
}
```

### 2. Upload Post Cover
```http
POST /api/upload/post-cover
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

**Form Data:**
- `cover` (file): Image file (max 5MB)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "cover_url": "http://localhost:3000/uploads/cover-123456.jpg",
    "file_info": {
      "original_name": "cover.jpg",
      "size": "2.5 MB",
      "mime_type": "image/jpeg"
    }
  },
  "message": "Cover image uploaded successfully"
}
```

### 3. Upload Multiple Post Images
```http
POST /api/upload/post-images
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

**Form Data:**
- `images` (file[]): Multiple image files (max 5 files, 5MB each)

**JavaScript Example:**
```javascript
const formData = new FormData();
for (let i = 0; i < fileInput.files.length; i++) {
  formData.append('images', fileInput.files[i]);
}

const response = await fetch('http://localhost:3000/api/upload/post-images', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
  body: formData
});
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "image_urls": [
      "http://localhost:3000/uploads/image1-123456.jpg",
      "http://localhost:3000/uploads/image2-123457.png"
    ],
    "count": 2,
    "files_info": [
      {
        "original_name": "image1.jpg",
        "size": "1.2 MB",
        "mime_type": "image/jpeg"
      },
      {
        "original_name": "image2.png",
        "size": "890 KB",
        "mime_type": "image/png"
      }
    ]
  },
  "message": "2 image(s) uploaded successfully"
}
```

### 4. Delete File
```http
DELETE /api/upload/file
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "file_url": "http://localhost:3000/uploads/image-123456.jpg"
}
```

---

## Admin

**Note:** All admin endpoints require admin role.

### 1. Get System Statistics
```http
GET /api/admin/stats
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "users": {
        "total": 150,
        "active": 145,
        "banned": 5,
        "new_last_week": 12
      },
      "posts": {
        "total": 450,
        "published": 420,
        "draft": 30,
        "new_last_week": 25
      },
      "engagement": {
        "total_comments": 890,
        "total_likes": 1250,
        "total_follows": 320
      }
    }
  }
}
```

### 2. Get All Users (Admin)
```http
GET /api/admin/users?page=1&limit=20&search=john&role=user&isActive=true
Authorization: Bearer {accessToken}
```

### 3. Ban User
```http
PUT /api/admin/users/:id/ban
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "reason": "Violation of community guidelines"
}
```

### 4. Unban User
```http
PUT /api/admin/users/:id/unban
Authorization: Bearer {accessToken}
```

### 5. Delete User (Admin)
```http
DELETE /api/admin/users/:id
Authorization: Bearer {accessToken}
```

### 6. Get All Posts (Admin)
```http
GET /api/admin/posts?page=1&limit=20&status=published&search=nodejs
Authorization: Bearer {accessToken}
```

### 7. Delete Post (Admin)
```http
DELETE /api/admin/posts/:id
Authorization: Bearer {accessToken}
```

### 8. Set Featured Post
```http
PUT /api/admin/posts/:id/featured
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request Body:**
```json
{
  "is_featured": true
}
```

### 9. Global Search
```http
GET /api/admin/search?q=javascript&limit=10
Authorization: Bearer {accessToken}
```

---

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Pagination Response
```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  },
  "message": "Data retrieved successfully"
}
```

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "details": []
  }
}
```

### Common Error Codes

#### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "message": "Unauthorized",
    "code": "UNAUTHORIZED"
  }
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "message": "Access denied",
    "code": "FORBIDDEN"
  }
}
```

#### 404 Not Found
```json
{
  "success": false,
  "error": {
    "message": "Post not found",
    "code": "NOT_FOUND"
  }
}
```

#### 409 Conflict
```json
{
  "success": false,
  "error": {
    "message": "Email already exists",
    "code": "CONFLICT"
  }
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "message": "Internal server error",
    "code": "INTERNAL_SERVER_ERROR"
  }
}
```

---

## Authentication Flow

### 1. Initial Login/Register
```javascript
// Register or Login
const { data } = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
}).then(res => res.json());

// Store tokens
localStorage.setItem('accessToken', data.tokens.accessToken);
localStorage.setItem('refreshToken', data.tokens.refreshToken);
localStorage.setItem('user', JSON.stringify(data.user));
```

### 2. Making Authenticated Requests
```javascript
const accessToken = localStorage.getItem('accessToken');

const response = await fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(postData)
});
```

### 3. Handling Token Expiration
```javascript
async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem('accessToken');

  // Add auth header
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`
  };

  let response = await fetch(url, options);

  // If 401, try to refresh token
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    const refreshResponse = await fetch('/api/auth/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (refreshResponse.ok) {
      const { data } = await refreshResponse.json();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // Retry original request with new token
      options.headers['Authorization'] = `Bearer ${data.accessToken}`;
      response = await fetch(url, options);
    } else {
      // Refresh failed, redirect to login
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  return response;
}
```

---

## React/Next.js Examples

### Custom Hook for API Calls
```javascript
// hooks/useAPI.js
import { useState, useEffect } from 'react';

export function useAPI(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`http://localhost:3000${url}`, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });

        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function PostsList() {
  const { data, loading, error } = useAPI('/api/posts?limit=10');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### API Service Class
```javascript
// services/api.js
class APIService {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('accessToken');

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);
    return await response.json();
  }

  // Auth
  login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  // Posts
  getPosts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/posts?${query}`);
  }

  getPost(id) {
    return this.request(`/posts/${id}`);
  }

  createPost(formData) {
    return this.request('/posts', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData
    });
  }

  likePost(postId) {
    return this.request(`/posts/${postId}/like`, { method: 'POST' });
  }

  // Comments
  getComments(postId, params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/posts/${postId}/comments?${query}`);
  }

  createComment(postId, content) {
    return this.request(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content })
    });
  }

  // Upload
  uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.request('/upload/avatar', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type
      body: formData
    });
  }
}

export default new APIService();

// Usage
import api from './services/api';

async function handleLogin(email, password) {
  const result = await api.login({ email, password });
  if (result.success) {
    localStorage.setItem('accessToken', result.data.tokens.accessToken);
    localStorage.setItem('refreshToken', result.data.tokens.refreshToken);
  }
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:
- **Window**: 15 minutes (900,000ms)
- **Max Requests**: 100 requests per window
- **Response Header**: `X-RateLimit-Remaining`

When rate limit is exceeded:
```json
{
  "success": false,
  "error": {
    "message": "Too many requests, please try again later",
    "code": "RATE_LIMIT_EXCEEDED"
  }
}
```

---

## Testing with Postman/Thunder Client

1. **Import Base URL**: `http://localhost:3000/api`
2. **Set Environment Variable**: `accessToken`
3. **Authorization Header**: `Bearer {{accessToken}}`
4. **Test Flow**:
   - POST `/auth/login` → Save `accessToken`
   - GET `/auth/me` with token
   - POST `/posts` to create post
   - GET `/posts` to list posts

---

## Support

For issues or questions:
- Check Swagger docs: `http://localhost:3000/api-docs`
- View detailed upload guide: `UPLOAD_API.md`
- View admin guide: `ADMIN_API.md`
