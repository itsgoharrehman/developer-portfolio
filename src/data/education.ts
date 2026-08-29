export const education = {
  degree: "Bachelor of Software Engineering",
  institution: "Government College University Faisalabad",
  shortName: "GCUF",
  period: {
    start: 2023,
    end: 2027,
  },
  current: 2025, // Update to current year
  description:
    "Studying software engineering fundamentals, systems programming, algorithms, and software architecture.",
  relevantCourses: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Database Systems",
    "Computer Networks",
    "Software Engineering",
    "Object-Oriented Programming",
  ],
};

export const codeFragments = [
  {
    id: "cf-01",
    language: "python",
    title: "Async endpoint with dependency injection",
    annotation: "WHY THIS EXISTS",
    annotationText: "FastAPI's dependency injection makes testing and separation of concerns clean. The service layer never touches the HTTP layer.",
    code: `@router.get("/users/{user_id}")
async def get_user(
    user_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserResponse:
    user = await user_service.get_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404)
    return UserResponse.model_validate(user)`,
  },
  {
    id: "cf-02",
    language: "python",
    title: "Redis cache with fallback",
    annotation: "TRADE-OFF",
    annotationText: "Cache-aside means potential stale data. The TTL is a business decision disguised as a technical one.",
    code: `async def get_user_cached(
    user_id: str,
    redis: Redis,
    db: AsyncSession,
) -> User | None:
    cached = await redis.get(f"user:{user_id}")
    if cached:
        return User.model_validate_json(cached)
    
    user = await db.get(User, user_id)
    if user:
        await redis.setex(
            f"user:{user_id}",
            ttl=3600,
            value=user.model_dump_json(),
        )
    return user`,
  },
  {
    id: "cf-03",
    language: "python",
    title: "Background task with error handling",
    annotation: "FAILURE MODE",
    annotationText: "Background tasks fail silently if you don't handle errors explicitly. This is the most common production bug in async systems.",
    code: `@celery.task(
    bind=True,
    max_retries=3,
    default_retry_delay=60,
)
def process_document(self, document_id: str) -> None:
    try:
        doc = Document.query.get(document_id)
        result = embedding_service.embed(doc.content)
        doc.embedding = result
        db.session.commit()
    except EmbeddingError as exc:
        raise self.retry(exc=exc)
    except Exception as exc:
        logger.error(f"Failed: {document_id}", exc_info=exc)
        raise`,
  },
];
