# Migration `20200611043925-create-users`

This migration has been generated by Renato Farias at 6/11/2020, 4:39:25 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"email" text  NOT NULL ,"id" SERIAL,"name" text   ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

DROP TABLE "public"."SequelizeMeta";

DROP TABLE "public"."users";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200611043925-create-users
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,17 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id     Int      @id @default(autoincrement())
+  name   String?
+  email  String   @unique
+}
```


