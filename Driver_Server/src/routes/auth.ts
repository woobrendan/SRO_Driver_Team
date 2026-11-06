// routes/auth.ts
import { Router, type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const COOKIE = "auth_token";

router.post("/login", async (req: Request, res: Response) => {
	const { username, password } = req.body ?? {};

	const userOk = username === process.env.AUTH_USERNAME;
	const passOk = await bcrypt.compare(String(password ?? ""), process.env.AUTH_PASSWORD_HASH ?? "");

	if (!userOk || !passOk) {
		return res.status(401).json({ error: "Invalid username or password" });
	}

	const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: "8h" });
	res.cookie(COOKIE, token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 8 * 60 * 60 * 1000
	});
	res.json({ ok: true });
});

router.post("/logout", (_req, res) => {
	res.clearCookie(COOKIE);
	res.json({ ok: true });
});

// lets the front end check whether the cookie is still valid
router.get("/me", (req, res) => {
	try {
		jwt.verify(req.cookies[COOKIE], process.env.JWT_SECRET!);
		res.json({ ok: true });
	} catch {
		res.status(401).json({ ok: false });
	}
});

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
	try {
		jwt.verify(req.cookies[COOKIE], process.env.JWT_SECRET!);
		next();
	} catch {
		res.status(401).json({ error: "Not authenticated" });
	}
};

export default router;
