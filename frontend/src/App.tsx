import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetails } from './pages/ProductDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminLayout } from './pages/admin/AdminLayout';
import { ProductsCrud } from './pages/admin/ProductsCrud';
import { ProductForm } from './pages/admin/ProductForm';
import { CategoriesCrud } from './pages/admin/CategoriesCrud';
import { CategoryForm } from './pages/admin/CategoryForm';
import { UsersCrud } from './pages/admin/UsersCrud';
import { UserForm } from './pages/admin/UserForm';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { Toaster } from 'sonner';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Nested Routes - Protected */}
              <Route path="/admin" element={
                <PrivateRoute roles={['ROLE_ADMIN', 'ROLE_OPERATOR']}>
                  <AdminLayout />
                </PrivateRoute>
              }>
                <Route index element={<Navigate to="products" replace />} />
                <Route path="products" element={<ProductsCrud />} />
                <Route path="products/form" element={<ProductForm />} />
                <Route path="products/:id" element={<ProductForm />} />
                <Route path="categories" element={<CategoriesCrud />} />
                <Route path="categories/form" element={<CategoryForm />} />
                <Route path="categories/:id" element={<CategoryForm />} />

                {/* Users management - ADMIN ONLY */}
                <Route
                  path="users/*"
                  element={
                    <PrivateRoute roles={['ROLE_ADMIN']}>
                      <Routes>
                        <Route index element={<UsersCrud />} />
                        <Route path="form" element={<UserForm />} />
                        <Route path=":id" element={<UserForm />} />
                      </Routes>
                    </PrivateRoute>
                  }
                />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: 'bg-background/95 border border-border/50 text-foreground shadow-2xl rounded-2xl backdrop-blur-xl p-4 gap-3 font-sans',
              title: 'font-bold text-[15px]',
              description: 'text-muted-foreground text-sm',
              actionButton: 'bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors',
              cancelButton: 'bg-muted text-foreground font-semibold px-4 py-2 rounded-lg hover:bg-muted/80 transition-colors',
              success: 'border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400',
              error: 'border-destructive/30 bg-destructive/10 text-destructive',
              icon: 'w-5 h-5 mr-1',
            }
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
