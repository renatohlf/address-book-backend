# Migration `20200611084229`

This migration has been generated by Renato Farias at 6/11/2020, 8:42:29 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Contact" DROP CONSTRAINT IF EXiSTS "Contact_userId_fkey",
ALTER COLUMN "userId" DROP NOT NULL;

ALTER TABLE "public"."Contact" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200611083456..20200611084229
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -23,7 +23,7 @@
   firstName   String
   lastName    String
   email       String
   phone       String
-  userId      Int     
-  user        User    @relation( fields: [userId], references: [id])
+  userId      Int?     
+  user        User?    @relation( fields: [userId], references: [id])
 }
```


