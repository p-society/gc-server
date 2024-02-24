# Protected route with role-based access control

```
r.Handle("/v0/auth/login", &security.RoleGuard{
		AllowedRoles: []string{security.RoleSuperAdmin, security.RoleAdmin},
		Handler:      http.HandlerFunc(handlers.Login),
	}).Methods("POST")
```