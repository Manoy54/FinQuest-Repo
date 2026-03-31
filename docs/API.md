# API Specification

> FinQuest — RESTful API Design (Supabase Auto-Generated + Custom Edge Functions)

## 1. Overview

FinQuest's API is provided by **Supabase's auto-generated REST API** (PostgREST) for CRUD operations, supplemented by **Edge Functions** for custom business logic. All endpoints require authentication via JWT tokens unless marked as public.

### Base URLs

```
REST API:     https://<project-ref>.supabase.co/rest/v1
Auth API:     https://<project-ref>.supabase.co/auth/v1
Storage API:  https://<project-ref>.supabase.co/storage/v1
Functions:    https://<project-ref>.supabase.co/functions/v1
```

### Authentication

All authenticated requests require the following headers:

```
Authorization: Bearer <JWT_ACCESS_TOKEN>
apikey: <SUPABASE_ANON_KEY>
Content-Type: application/json
```

---

## 2. Authentication Endpoints

### 2.1 Register

```
POST /auth/v1/signup
```

**Request Body:**

```json
{
    "email": "student@university.edu.ph",
    "password": "securePassword123",
    "data": {
        "display_name": "Juan Dela Cruz"
    }
}
```

**Response (201 Created):**

```json
{
    "user": {
        "id": "uuid-here",
        "email": "student@university.edu.ph",
        "user_metadata": {
            "display_name": "Juan Dela Cruz"
        }
    },
    "session": {
        "access_token": "eyJhbG...",
        "refresh_token": "abc123...",
        "expires_in": 3600
    }
}
```

### 2.2 Login

```
POST /auth/v1/token?grant_type=password
```

**Request Body:**

```json
{
    "email": "student@university.edu.ph",
    "password": "securePassword123"
}
```

**Response (200 OK):**

```json
{
    "access_token": "eyJhbG...",
    "refresh_token": "abc123...",
    "user": { "id": "uuid-here", "email": "student@university.edu.ph" },
    "expires_in": 3600
}
```

### 2.3 Logout

```
POST /auth/v1/logout
Authorization: Bearer <JWT>
```

### 2.4 Password Reset

```
POST /auth/v1/recover
```

```json
{ "email": "student@university.edu.ph" }
```

---

## 3. Profile Endpoints

### 3.1 Get Current User Profile

```
GET /rest/v1/profiles?id=eq.<user_id>&select=*
```

**Response:**

```json
[{
    "id": "uuid-here",
    "display_name": "Juan Dela Cruz",
    "avatar_config": { "sex": "man", "hairStyle": "normal", ... },
    "level": 15,
    "rank": "Analyst",
    "role": "student",
    "is_premium": false,
    "created_at": "2026-01-15T08:00:00Z",
    "updated_at": "2026-03-30T03:00:00Z"
}]
```

### 3.2 Update Profile

```
PATCH /rest/v1/profiles?id=eq.<user_id>
```

```json
{
    "display_name": "Updated Name",
    "avatar_config": { "sex": "man", "hairStyle": "mohawk", ... }
}
```

### 3.3 Complete Avatar Setup

```
PATCH /rest/v1/profiles?id=eq.<user_id>
```

```json
{
    "display_name": "Juan",
    "avatar_config": { ... },
    "updated_at": "2026-03-30T03:00:00Z"
}
```

---

## 4. User Stats Endpoints

### 4.1 Get User Stats

```
GET /rest/v1/user_stats?user_id=eq.<user_id>&select=*
```

**Response:**

```json
[{
    "user_id": "uuid-here",
    "total_xp": 12500,
    "total_coins": 6800,
    "current_coins": 4200,
    "games_played": 47,
    "total_correct": 312
}]
```

### 4.2 Add XP (via RPC)

```
POST /rest/v1/rpc/add_xp
```

```json
{
    "p_user_id": "uuid-here",
    "p_amount": 150
}
```

**Database Function:**

```sql
CREATE OR REPLACE FUNCTION add_xp(p_user_id UUID, p_amount INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE user_stats
    SET total_xp = total_xp + p_amount, updated_at = NOW()
    WHERE user_id = p_user_id;

    -- Auto-level up
    UPDATE profiles
    SET level = GREATEST(1, FLOOR(
        (SELECT total_xp FROM user_stats WHERE user_id = p_user_id) / 1000
    ) + 1)
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 5. Game Session Endpoints

### 5.1 Record Game Session

```
POST /rest/v1/game_sessions
```

```json
{
    "user_id": "uuid-here",
    "game_mode": "speed-round",
    "score": 18,
    "xp_earned": 540,
    "coins_earned": 270,
    "duration_seconds": 60,
    "questions_answered": 22,
    "correct_answers": 18,
    "metadata": {
        "best_streak": 7,
        "final_time_left": 0
    }
}
```

### 5.2 Get User Game History

```
GET /rest/v1/game_sessions?user_id=eq.<user_id>&order=completed_at.desc&limit=20
```

### 5.3 Get High Score for Game Mode

```
GET /rest/v1/game_sessions?user_id=eq.<user_id>&game_mode=eq.speed-round&select=score&order=score.desc&limit=1
```

---

## 6. Leaderboard Endpoints

### 6.1 Get XP Leaderboard

```
GET /rest/v1/leaderboard_xp?select=*&order=position.asc&limit=50
```

**Response:**

```json
[
    {
        "user_id": "uuid-1",
        "display_name": "Carlos Reyes",
        "level": 52,
        "rank": "FinQuest Grandmaster",
        "total_xp": 48750,
        "position": 1
    },
    ...
]
```

### 6.2 Get Coins Leaderboard

```
GET /rest/v1/leaderboard_coins?select=*&order=position.asc&limit=50
```

### 6.3 Get User's Rank (Custom RPC)

```
POST /rest/v1/rpc/get_user_rank
```

```json
{ "p_user_id": "uuid-here", "p_type": "xp" }
```

---

## 7. Streak Endpoints

### 7.1 Get Streak Data

```
GET /rest/v1/streak_data?user_id=eq.<user_id>&select=*
```

### 7.2 Daily Check-In (Custom RPC)

```
POST /rest/v1/rpc/daily_check_in
```

```json
{ "p_user_id": "uuid-here" }
```

**Database Function:**

```sql
CREATE OR REPLACE FUNCTION daily_check_in(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_streak streak_data%ROWTYPE;
    v_today DATE := CURRENT_DATE;
    v_yesterday DATE := CURRENT_DATE - 1;
    v_reward JSONB;
BEGIN
    SELECT * INTO v_streak FROM streak_data WHERE user_id = p_user_id;

    IF v_streak.last_check_in = v_today THEN
        RETURN jsonb_build_object('already_checked_in', true);
    END IF;

    IF v_streak.last_check_in = v_yesterday THEN
        v_streak.current_streak := v_streak.current_streak + 1;
    ELSE
        v_streak.current_streak := 1;
    END IF;

    v_streak.longest_streak := GREATEST(v_streak.longest_streak, v_streak.current_streak);
    v_streak.last_check_in := v_today;
    v_streak.check_in_history := array_append(v_streak.check_in_history, v_today);

    UPDATE streak_data SET
        current_streak = v_streak.current_streak,
        longest_streak = v_streak.longest_streak,
        last_check_in = v_streak.last_check_in,
        check_in_history = v_streak.check_in_history,
        updated_at = NOW()
    WHERE user_id = p_user_id;

    -- Milestone rewards
    v_reward := CASE v_streak.current_streak
        WHEN 3 THEN '{"xp": 100, "coins": 50}'::JSONB
        WHEN 7 THEN '{"xp": 300, "coins": 150}'::JSONB
        WHEN 14 THEN '{"xp": 500, "coins": 250}'::JSONB
        WHEN 30 THEN '{"xp": 1000, "coins": 500}'::JSONB
        ELSE '{"xp": 25, "coins": 10}'::JSONB
    END;

    RETURN jsonb_build_object(
        'streak', v_streak.current_streak,
        'reward', v_reward
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 8. Achievement Endpoints

### 8.1 Get User Achievements

```
GET /rest/v1/user_achievements?user_id=eq.<user_id>&select=*,achievements(*)
```

### 8.2 Unlock Achievement

```
POST /rest/v1/user_achievements
```

```json
{
    "user_id": "uuid-here",
    "achievement_id": "streak-starter"
}
```

### 8.3 Get All Achievement Definitions

```
GET /rest/v1/achievements?select=*&order=category.asc
```

---

## 9. Library Endpoints

### 9.1 List Library Items

```
GET /rest/v1/library_items?select=*&order=created_at.desc
```

### 9.2 Filter by Type

```
GET /rest/v1/library_items?type=eq.module&select=*
```

### 9.3 Search

```
GET /rest/v1/library_items?or=(title.ilike.*banking*,category.ilike.*banking*)&select=*
```

---

## 10. Edge Function Endpoints

### 10.1 Validate Game Score

```
POST /functions/v1/validate-score
```

```json
{
    "game_mode": "speed-round",
    "score": 18,
    "duration": 60,
    "questions_answered": 22
}
```

**Response (200 OK):**

```json
{ "valid": true }
```

**Response (400 Bad Request):**

```json
{ "valid": false, "reason": "Suspicious score rate" }
```

### 10.2 Distribute Weekly Rewards

```
POST /functions/v1/distribute-rewards
X-Supabase-Webhook-Secret: <secret>
```

*Triggered by cron schedule, not by client.*

---

## 11. Error Response Format

All errors follow a consistent format:

```json
{
    "error": {
        "code": "PGRST301",
        "message": "Row not found",
        "details": null,
        "hint": null
    }
}
```

### Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created |
| `204` | No Content (successful delete) |
| `400` | Bad Request (validation error) |
| `401` | Unauthorized (invalid/missing JWT) |
| `403` | Forbidden (RLS policy violation) |
| `404` | Not Found |
| `409` | Conflict (duplicate entry) |
| `500` | Internal Server Error |

---

*Last updated: March 2026*
