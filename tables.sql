CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT 'now()',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

CREATE TABLE "usersLinks" (
	"id" serial NOT NULL,
	"fullLink" TEXT NOT NULL,
	"shortLink" TEXT NOT NULL,
	"userId" int NOT NULL,
	"views" int NOT NULL DEFAULT '0',
	"createdAt" DATE NOT NULL DEFAULT 'now()',
	CONSTRAINT "usersLinks_pk" PRIMARY KEY ("id")
);


CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"token" TEXT NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT 'now()',
	"userId" int NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
);

ALTER TABLE "usersLinks" ADD CONSTRAINT "usersLinks_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");