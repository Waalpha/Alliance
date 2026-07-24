import React, { useState, useRef, useEffect } from 'react';
import {
  Shield,
  Upload,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit,
  UserPlus,
  Users,
  Building,
  CheckCircle2,
  X,
  Download,
  FileCode,
  Globe,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowLeft,
  Layout,
  Layers,
  Target,
  FileText,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Sliders,
  LogOut,
  Lock,
  Key,
} from 'lucide-react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useProject, ProjectConfig, DEFAULT_HERO_SLIDES, fixImageUrl } from '../context/ProjectContext';
import { Signatory, StatItem, ObjectiveItem, PartnerAgency, HeroSlide } from '../types';

interface SuperAdminPageProps {
  onClose: () => void;
}

export const SuperAdminPage: React.FC<SuperAdminPageProps> = ({ onClose }) => {
  const {
    config,
    updateConfig,
    resetToDefaults,
    cloudSyncStatus,
    addSignatory,
    updateSignatory,
    deleteSignatory,
    addObjective,
    updateObjective,
    deleteObjective,
    addPartner,
    updatePartner,
    deletePartner,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
  } = useProject();

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const currentHeroSlides = config.heroSlides && config.heroSlides.length > 0 ? config.heroSlides : DEFAULT_HERO_SLIDES;
  const safeSlideIdx = activeSlideIndex >= currentHeroSlides.length ? 0 : activeSlideIndex;
  const selectedHeroSlide = currentHeroSlides[safeSlideIdx] || currentHeroSlides[0];

  // Google Authentication State
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message || 'Google authentication failed. Please try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign Out Error:', err);
    }
  };

  const [activeTab, setActiveTab] = useState<
    'identity' | 'members' | 'footer' | 'hero-stats' | 'content' | 'backup'
  >('identity');

  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Signatory Form State
  const [editingSignatoryId, setEditingSignatoryId] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState<Omit<Signatory, 'id'>>({
    name: '',
    titles: '',
    organization: '',
    group: 'ALLIANCE OF THEOLOGICAL SCHOOLS',
    roleTitle: '',
    signedDate: '14 August 2026',
  });

  // Logo file upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size exceeds 2MB limit. Please select a smaller file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig({ logoUrl: reader.result as string });
        showToast('Logo updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Signatory Form Handlers
  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.organization.trim()) {
      alert('Please fill in Member Name and Organization.');
      return;
    }

    if (editingSignatoryId) {
      updateSignatory(editingSignatoryId, memberForm);
      showToast('Member updated successfully!');
      setEditingSignatoryId(null);
    } else {
      addSignatory(memberForm);
      showToast('New member added successfully!');
    }

    setMemberForm({
      name: '',
      titles: '',
      organization: '',
      group: 'ALLIANCE OF THEOLOGICAL SCHOOLS',
      roleTitle: '',
      signedDate: '14 August 2026',
    });
  };

  const handleEditMemberClick = (sig: Signatory) => {
    setEditingSignatoryId(sig.id);
    setMemberForm({
      name: sig.name,
      titles: sig.titles,
      organization: sig.organization,
      group: sig.group,
      roleTitle: sig.roleTitle,
      signedDate: sig.signedDate || '14 August 2026',
    });
  };

  const handleCancelMemberEdit = () => {
    setEditingSignatoryId(null);
    setMemberForm({
      name: '',
      titles: '',
      organization: '',
      group: 'ALLIANCE OF THEOLOGICAL SCHOOLS',
      roleTitle: '',
      signedDate: '14 August 2026',
    });
  };

  // Export Config
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${config.name.toLowerCase().replace(/\s+/g, '_')}_config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Project configuration exported!');
  };

  // Google Authentication Gate Loading Screen
  if (authLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#031021] text-white flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-mono text-[#D4AF37] animate-pulse">
          Verifying Google Super Admin Credentials...
        </p>
      </div>
    );
  }

  // Google Authentication Gate Required Sign-In
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#031021] text-white flex flex-col items-center justify-center p-6">
        {/* Kenya Flag Top Bar */}
        <div className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#08783D] via-[#B51D28] to-[#0A4D8C] z-50"></div>

        <div className="max-w-md w-full bg-[#0A4D8C] border-2 border-[#D4AF37] rounded-2xl p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B51D28] flex items-center justify-center text-[#051A33] shadow-xl">
            <Lock className="w-8 h-8 text-[#051A33]" />
          </div>

          <div className="space-y-2">
            <span className="inline-block bg-[#B51D28] text-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase shadow">
              RESTRICTED SUPER ADMIN ACCESS
            </span>
            <h2 className="font-serif-heading text-2xl font-extrabold text-white">
              Super Admin Security Gate
            </h2>
            <p className="text-xs text-gray-200 leading-relaxed">
              Google Account Sign-In is strictly required to access the ATS-Kenya Super Admin Portal and protect institutional parameters from unauthorized editing.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-900/60 border border-red-400/50 rounded-xl text-xs text-red-200 text-left">
              <span className="font-bold">Auth Error: </span> {authError}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={handleGoogleSignIn}
              disabled={authLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-gray-100 text-[#051A33] font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-3 cursor-pointer group hover:scale-[1.02]"
            >
              {/* Google colored G emblem */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign In with Google Account</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-transparent hover:bg-white/10 text-gray-300 font-semibold text-xs transition-colors cursor-pointer border border-white/20"
            >
              Cancel & Return to Live Portal
            </button>
          </div>

          <div className="pt-3 border-t border-white/15 text-[11px] text-gray-300 flex items-center justify-center space-x-1.5">
            <Key className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Encrypted Institutional Portal Authorization</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#051A33] text-white flex flex-col font-sans">
      
      {/* Toast Alert */}
      {saveToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#08783D] border border-emerald-400 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="font-bold text-sm">{saveToast}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="bg-[#0A4D8C] border-b-2 border-[#D4AF37] px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xl">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#051A33] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#051A33] transition-colors flex items-center space-x-1.5 text-xs font-bold border border-[#D4AF37]/40"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Live Portal</span>
          </button>

          <div className="h-6 w-px bg-white/20 hidden sm:block"></div>

          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B51D28] flex items-center justify-center text-[#051A33] shadow">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif-heading text-lg font-bold text-white flex items-center space-x-2">
                <span>SUPER ADMIN DASHBOARD</span>
                <span className="text-[10px] bg-[#B51D28] text-white px-2 py-0.5 rounded font-mono uppercase tracking-widest font-extrabold">
                  Full Control
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                    cloudSyncStatus === 'synced'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                      : cloudSyncStatus === 'syncing'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/40 animate-pulse'
                      : 'bg-red-950/80 text-red-300 border-red-500/40'
                  }`}
                >
                  Firestore: alliance
                </span>
              </h1>
              <p className="text-xs text-gray-300">
                Manage Project Identity, Logo, Members, Footer, & Strategic Content
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Signed-In Google User Badge */}
          <div className="flex items-center space-x-2 bg-[#051A33] px-3 py-1.5 rounded-xl border border-[#D4AF37]/40">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Super Admin'}
                className="w-7 h-7 rounded-full border border-[#D4AF37] object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#0A4D8C] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold text-xs">
                {(user.displayName || user.email || 'A').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                <span>{user.displayName || 'Super Admin'}</span>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded text-[9px] font-mono">
                  Verified Google
                </span>
              </div>
              <div className="text-[10px] text-gray-300 font-mono">{user.email}</div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="p-2 sm:px-3 sm:py-2 rounded-lg bg-[#B51D28] hover:bg-red-700 text-white text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer border border-red-400/30 shadow"
            title="Sign Out Google Account"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

          <button
            onClick={() => showToast('All changes saved to project!')}
            className="hidden sm:flex items-center space-x-2 bg-[#08783D] hover:bg-[#066131] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg border border-emerald-400/30 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
            title="Close Admin Panel"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/15 pb-4">
          <button
            onClick={() => setActiveTab('identity')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'identity'
                ? 'bg-[#D4AF37] text-[#051A33] shadow-lg scale-105'
                : 'bg-[#0A4D8C] text-gray-300 hover:bg-[#0A4D8C]/80 hover:text-white border border-white/10'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Brand & Logo</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'members'
                ? 'bg-[#D4AF37] text-[#051A33] shadow-lg scale-105'
                : 'bg-[#0A4D8C] text-gray-300 hover:bg-[#0A4D8C]/80 hover:text-white border border-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Members & Signatories ({config.signatories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('footer')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'footer'
                ? 'bg-[#D4AF37] text-[#051A33] shadow-lg scale-105'
                : 'bg-[#0A4D8C] text-gray-300 hover:bg-[#0A4D8C]/80 hover:text-white border border-white/10'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Footer & Contact</span>
          </button>

          <button
            onClick={() => setActiveTab('hero-stats')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'hero-stats'
                ? 'bg-[#D4AF37] text-[#051A33] shadow-lg scale-105'
                : 'bg-[#0A4D8C] text-gray-300 hover:bg-[#0A4D8C]/80 hover:text-white border border-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Hero Banner & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'bg-[#D4AF37] text-[#051A33] shadow-lg scale-105'
                : 'bg-[#0A4D8C] text-gray-300 hover:bg-[#0A4D8C]/80 hover:text-white border border-white/10'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Objectives & Partners</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ml-auto ${
              activeTab === 'backup'
                ? 'bg-[#B51D28] text-white shadow-lg scale-105'
                : 'bg-[#0A4D8C] text-gray-300 hover:bg-[#0A4D8C]/80 hover:text-white border border-white/10'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Backup & Reset</span>
          </button>
        </div>

        {/* TAB 1: BRAND IDENTITY & LOGO */}
        {activeTab === 'identity' && (
          <div className="space-y-6">
            <div className="bg-[#0D2C68] border-2 border-[#D5A52A]/40 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <h2 className="font-serif-heading font-bold text-lg text-[#D5A52A] flex items-center space-x-2">
                    <Building className="w-5 h-5 text-[#D5A52A]" />
                    <span>Project Brand & Logo Configuration</span>
                  </h2>
                  <p className="text-xs text-gray-300">
                    Upload custom project logo and update portal identity names
                  </p>
                </div>
              </div>

              {/* Logo Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#071A46] p-5 rounded-xl border border-white/10">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Project Logo Customization
                  </label>
                  <p className="text-xs text-gray-400">
                    Upload your official institution or project logo (PNG, JPG, SVG up to 2MB) or provide a direct image URL.
                  </p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 bg-[#08783D] hover:bg-[#066131] text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Logo File</span>
                    </button>

                    {config.logoUrl && (
                      <button
                        type="button"
                        onClick={() => updateConfig({ logoUrl: '' })}
                        className="flex items-center space-x-2 bg-red-900/50 hover:bg-red-800 text-red-200 px-3 py-2.5 rounded-lg text-xs font-bold border border-red-500/30 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove Custom Logo</span>
                      </button>
                    )}
                  </div>

                  <div className="pt-2">
                    <label className="block text-[11px] text-gray-400 mb-1">
                      Or Direct Image URL:
                    </label>
                    <input
                      type="text"
                      value={config.logoUrl}
                      onChange={(e) => updateConfig({ logoUrl: e.target.value })}
                      placeholder="https://example.com/logo.png"
                      className="w-full bg-[#0D2C68] border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-[#D5A52A] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Logo Preview Card */}
                <div className="flex flex-col items-center justify-center p-6 bg-[#0D2C68]/60 border-2 border-dashed border-[#D5A52A]/40 rounded-xl">
                  <span className="text-xs text-gray-400 font-bold uppercase mb-3">
                    Active Header Logo Preview
                  </span>
                  {config.logoUrl ? (
                    <div className="p-3 bg-white rounded-xl shadow-lg border-2 border-[#D5A52A]">
                      <img
                        src={config.logoUrl}
                        alt="Project Logo Preview"
                        className="h-16 w-auto max-w-[200px] object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0D2C68] to-[#071A46] border-2 border-[#D5A52A] flex items-center justify-center text-[#D5A52A] shadow-lg">
                      <Shield className="w-8 h-8" />
                    </div>
                  )}
                  <p className="text-[11px] text-gray-300 mt-3 font-semibold">
                    {config.logoUrl ? 'Custom Logo Loaded' : 'Default Emblem Active'}
                  </p>
                </div>
              </div>

              {/* Text Names & Branding Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#D5A52A]">
                    Project / Organization Title
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => updateConfig({ name: e.target.value })}
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                    placeholder="e.g. ATS-KENYA"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#D5A52A]">
                    Portal Badge Name
                  </label>
                  <input
                    type="text"
                    value={config.badge}
                    onChange={(e) => updateConfig({ badge: e.target.value })}
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                    placeholder="e.g. PARTNERSHIP PORTAL"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#D5A52A]">
                    Tagline / Subheading
                  </label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => updateConfig({ tagline: e.target.value })}
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                    placeholder="e.g. Theological Education Partnership"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#D5A52A]">
                    Agreement Reference Code
                  </label>
                  <input
                    type="text"
                    value={config.refNumber}
                    onChange={(e) => updateConfig({ refNumber: e.target.value })}
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2.5 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                    placeholder="e.g. GoK/MoE/ATS-2026/001"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => showToast('Brand identity updated successfully!')}
                  className="bg-[#08783D] hover:bg-[#066131] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow flex items-center space-x-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Apply Identity Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEMBERS & SIGNATORIES MANAGEMENT */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            
            {/* Add / Edit Member Form Card */}
            <div className="bg-[#0D2C68] border-2 border-[#D5A52A]/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <h2 className="font-serif-heading font-bold text-lg text-[#D5A52A] flex items-center space-x-2">
                  <UserPlus className="w-5 h-5 text-[#D5A52A]" />
                  <span>
                    {editingSignatoryId ? 'Edit Project Member / Signatory' : 'Add New Member / Signatory'}
                  </span>
                </h2>
                {editingSignatoryId && (
                  <button
                    onClick={handleCancelMemberEdit}
                    className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveMember} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-200">
                    Full Name & Qualifications *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    placeholder="e.g. Dr. Jane Doe, PhD"
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-200">
                    Designation / Title
                  </label>
                  <input
                    type="text"
                    value={memberForm.titles}
                    onChange={(e) => setMemberForm({ ...memberForm, titles: e.target.value })}
                    placeholder="e.g. Principal Secretary / Director General"
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-200">
                    Organization / Ministry *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.organization}
                    onChange={(e) => setMemberForm({ ...memberForm, organization: e.target.value })}
                    placeholder="e.g. State Department for Higher Education"
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-200">
                    Affiliation Group
                  </label>
                  <select
                    value={memberForm.group}
                    onChange={(e) =>
                      setMemberForm({
                        ...memberForm,
                        group: e.target.value as 'GOVERNMENT OF KENYA' | 'ALLIANCE OF THEOLOGICAL SCHOOLS',
                      })
                    }
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                  >
                    <option value="GOVERNMENT OF KENYA">GOVERNMENT OF KENYA</option>
                    <option value="ALLIANCE OF THEOLOGICAL SCHOOLS">ALLIANCE OF THEOLOGICAL SCHOOLS</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-200">
                    Committee / Mandate Role
                  </label>
                  <input
                    type="text"
                    value={memberForm.roleTitle}
                    onChange={(e) => setMemberForm({ ...memberForm, roleTitle: e.target.value })}
                    placeholder="e.g. Joint Steering Committee Chair"
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-200">
                    Signed / Appointed Date
                  </label>
                  <input
                    type="text"
                    value={memberForm.signedDate}
                    onChange={(e) => setMemberForm({ ...memberForm, signedDate: e.target.value })}
                    placeholder="14 August 2026"
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                  />
                </div>

                <div className="lg:col-span-3 flex items-center justify-end space-x-3 pt-2">
                  {editingSignatoryId && (
                    <button
                      type="button"
                      onClick={handleCancelMemberEdit}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-[#08783D] hover:bg-[#066131] text-white px-5 py-2 rounded-lg text-xs font-bold shadow flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingSignatoryId ? 'Update Member' : 'Add Member'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Members List Table */}
            <div className="bg-[#0D2C68] border-2 border-[#D5A52A]/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-heading font-bold text-base text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-[#D5A52A]" />
                  <span>Current Project Members & Signatories ({config.signatories.length})</span>
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#071A46] text-[#D5A52A] font-bold border-b border-white/20">
                      <th className="p-3">Member Name</th>
                      <th className="p-3">Designation</th>
                      <th className="p-3">Organization</th>
                      <th className="p-3">Group</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {config.signatories.map((sig) => (
                      <tr key={sig.id} className="hover:bg-[#071A46]/50 transition-colors">
                        <td className="p-3 font-bold text-white">
                          <div>{sig.name}</div>
                          <span className="text-[10px] text-gray-400 font-normal">{sig.roleTitle}</span>
                        </td>
                        <td className="p-3 text-gray-200">{sig.titles}</td>
                        <td className="p-3 text-gray-300">{sig.organization}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              sig.group === 'GOVERNMENT OF KENYA'
                                ? 'bg-blue-900/80 text-blue-200 border border-blue-400/30'
                                : 'bg-emerald-900/80 text-emerald-200 border border-emerald-400/30'
                            }`}
                          >
                            {sig.group}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleEditMemberClick(sig)}
                            className="p-1.5 bg-[#071A46] hover:bg-[#D5A52A] hover:text-[#071A46] text-[#D5A52A] rounded-lg transition-colors cursor-pointer"
                            title="Edit Member"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove member "${sig.name}" from the project?`)) {
                                deleteSignatory(sig.id);
                                showToast('Member deleted.');
                              }
                            }}
                            className="p-1.5 bg-red-900/40 hover:bg-red-700 text-red-200 rounded-lg transition-colors cursor-pointer"
                            title="Delete Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: FOOTER & CONTACT SETTINGS */}
        {activeTab === 'footer' && (
          <div className="bg-[#0D2C68] border-2 border-[#D5A52A]/40 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-serif-heading font-bold text-lg text-[#D5A52A] flex items-center space-x-2">
                <Layout className="w-5 h-5 text-[#D5A52A]" />
                <span>Footer & Contact Details Customization</span>
              </h2>
              <p className="text-xs text-gray-300">
                Update portal footer message, copyright notice, support email, and physical office contact.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-200">
                  Footer Description Statement
                </label>
                <textarea
                  rows={3}
                  value={config.footerDescription}
                  onChange={(e) => updateConfig({ footerDescription: e.target.value })}
                  className="w-full bg-[#071A46] border border-white/20 rounded-lg p-3 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-200">
                    Copyright Notice Line
                  </label>
                  <input
                    type="text"
                    value={config.copyrightText}
                    onChange={(e) => updateConfig({ copyrightText: e.target.value })}
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-200">
                    Official Support Email
                  </label>
                  <input
                    type="email"
                    value={config.contactEmail}
                    onChange={(e) => updateConfig({ contactEmail: e.target.value })}
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-200">
                    Telephone Contacts
                  </label>
                  <input
                    type="text"
                    value={config.contactPhone}
                    onChange={(e) => updateConfig({ contactPhone: e.target.value })}
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-200">
                    Physical Headquarters Address
                  </label>
                  <input
                    type="text"
                    value={config.officeAddress}
                    onChange={(e) => updateConfig({ officeAddress: e.target.value })}
                    className="w-full bg-[#071A46] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => showToast('Footer details saved!')}
                  className="bg-[#08783D] hover:bg-[#066131] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow flex items-center space-x-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Footer Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HERO BANNER & STATS */}
        {activeTab === 'hero-stats' && (
          <div className="space-y-6">
            <div className="bg-[#0D2C68] border-2 border-[#D5A52A]/40 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="border-b border-white/15 pb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif-heading font-bold text-lg text-[#D5A52A] flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-[#D5A52A]" />
                    <span>Hero Banner & Slide Customization ({currentHeroSlides.length} Interactive Slides)</span>
                  </h2>
                  <p className="text-xs text-gray-300">
                    Manage badges, headlines, narrative summaries, and background images across all Hero slides in the rotation.
                  </p>
                </div>

                <button
                  onClick={() => {
                    addHeroSlide({
                      badge: 'NEW ACCREDITED INITIATIVE',
                      title: 'New Hero Slide Title',
                      subtitle: 'Detailed description of the new initiative for member institutions.',
                      image: '/assets/images/ats_hero_main_1784811196710.jpg',
                    });
                    setActiveSlideIndex(currentHeroSlides.length);
                    showToast('New Hero slide added!');
                  }}
                  className="bg-[#08783D] hover:bg-[#066131] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow flex items-center space-x-1.5 cursor-pointer border border-emerald-400/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Hero Slide</span>
                </button>
              </div>

              {/* Horizontal Slide Selector Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-200 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Layers className="w-4 h-4 text-[#D5A52A]" />
                    <span>Select Hero Slide to Edit:</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#D5A52A]">
                    Editing Slide {safeSlideIdx + 1} of {currentHeroSlides.length}
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {currentHeroSlides.map((slide, idx) => {
                    const isActive = idx === safeSlideIdx;
                    return (
                      <div
                        key={slide.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setActiveSlideIndex(idx)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setActiveSlideIndex(idx);
                          }
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                          isActive
                            ? 'bg-[#071A46] border-[#D5A52A] shadow-lg ring-2 ring-[#D5A52A]/50'
                            : 'bg-[#051A33] border-white/10 hover:border-white/30 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded font-mono ${
                            isActive ? 'bg-[#D5A52A] text-[#051A33]' : 'bg-white/10 text-gray-300'
                          }`}>
                            Slide {idx + 1}
                          </span>
                          {currentHeroSlides.length > 1 && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm(`Delete Slide ${idx + 1} ("${slide.title.slice(0, 30)}...")?`)) {
                                  deleteHeroSlide(slide.id);
                                  if (safeSlideIdx >= currentHeroSlides.length - 1) {
                                    setActiveSlideIndex(Math.max(0, currentHeroSlides.length - 2));
                                  }
                                  showToast('Slide removed');
                                }
                              }}
                              className="text-red-400 hover:text-red-200 p-1 hover:bg-red-900/40 rounded transition-colors cursor-pointer"
                              title="Delete Slide"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <div className="text-xs font-bold text-white line-clamp-1 truncate">
                          {slide.title || 'Untitled Slide'}
                        </div>
                        <div className="text-[10px] text-gray-400 line-clamp-1 truncate mt-0.5">
                          {slide.badge}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Slide Form Editor Box */}
              {selectedHeroSlide && (
                <div className="p-5 bg-[#071A46] rounded-xl border-2 border-[#D5A52A]/30 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="bg-[#D5A52A] text-[#051A33] text-xs font-extrabold px-2.5 py-1 rounded-md font-mono">
                        SLIDE {safeSlideIdx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-[#D5A52A]">
                        Editing Slide Details
                      </h3>
                    </div>
                    <span className="text-[11px] text-gray-300 font-mono">
                      ID: {selectedHeroSlide.id}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Slide Badge */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        Slide Badge Text (Category / Header Label)
                      </label>
                      <input
                        type="text"
                        value={selectedHeroSlide.badge}
                        onChange={(e) =>
                          updateHeroSlide(selectedHeroSlide.id, { badge: e.target.value })
                        }
                        className="w-full bg-[#051A33] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                        placeholder="e.g. OFFICIAL INSTITUTIONAL ALLIANCE"
                      />
                    </div>

                    {/* Slide Title */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        Slide Main Headline Title
                      </label>
                      <textarea
                        rows={2}
                        value={selectedHeroSlide.title}
                        onChange={(e) =>
                          updateHeroSlide(selectedHeroSlide.id, { title: e.target.value })
                        }
                        className="w-full bg-[#051A33] border border-white/20 rounded-lg p-3 text-xs text-white font-serif-heading font-bold focus:border-[#D5A52A] focus:outline-none"
                        placeholder="Enter hero main title..."
                      />
                    </div>

                    {/* Slide Subtitle */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-200">
                        Slide Subtitle / Narrative
                      </label>
                      <textarea
                        rows={3}
                        value={selectedHeroSlide.subtitle}
                        onChange={(e) =>
                          updateHeroSlide(selectedHeroSlide.id, { subtitle: e.target.value })
                        }
                        className="w-full bg-[#051A33] border border-white/20 rounded-lg p-3 text-xs text-white focus:border-[#D5A52A] focus:outline-none"
                        placeholder="Enter slide narrative description..."
                      />
                    </div>

                    {/* Slide Motion Animation Trajectory */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-gray-200 flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-[#D5A52A]" />
                        <span>Title & Subtitle Slide Motion Trajectory</span>
                      </label>
                      <select
                        value={selectedHeroSlide.animationStyle || 'auto'}
                        onChange={(e) =>
                          updateHeroSlide(selectedHeroSlide.id, { animationStyle: e.target.value as any })
                        }
                        className="w-full bg-[#051A33] border border-white/20 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D5A52A] focus:outline-none cursor-pointer font-semibold"
                      >
                        <option value="auto">✨ Auto Trajectory (Unique motion for every slide)</option>
                        <option value="staggered">↔️ Horizontal Staggered (Title Far Left, Subtitle Far Right)</option>
                        <option value="cascade">↕️ Top & Bottom Cascade (Title Top, Subtitle Bottom)</option>
                        <option value="diagonal">↘️ Diagonal Cross-Slide (Title Top-Left, Subtitle Bottom-Right)</option>
                        <option value="spring">🌀 Spring Rise & Slide-In (Title Bottom Spring, Subtitle Left)</option>
                      </select>
                      <p className="text-[10px] text-gray-400">
                        Controls how this slide's main title and subtitle slide onto the screen during transitions.
                      </p>
                    </div>

                    {/* Slide Background Image Selection */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <label className="block text-xs font-bold text-gray-200 flex items-center justify-between">
                        <span className="flex items-center space-x-1.5">
                          <ImageIcon className="w-4 h-4 text-[#D5A52A]" />
                          <span>Slide Background Photo / Image URL</span>
                        </span>
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                        <div className="md:col-span-2 space-y-2">
                          <input
                            type="text"
                            value={selectedHeroSlide.image}
                            onChange={(e) =>
                              updateHeroSlide(selectedHeroSlide.id, { image: e.target.value })
                            }
                            className="w-full bg-[#051A33] border border-white/20 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-[#D5A52A] focus:outline-none"
                            placeholder="Enter image URL or select preset below..."
                          />

                          {/* Preset Images Quick Pickers */}
                          <div className="space-y-1">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                              Quick Preset Official Background Photos:
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {[
                                {
                                  name: 'ATS Main Building',
                                  url: '/assets/images/ats_hero_main_1784811196710.jpg',
                                },
                                {
                                  name: 'ATS Campus View',
                                  url: '/assets/images/ats_campus_view_1784811210823.jpg',
                                },
                                {
                                  name: 'ATS Theological Library',
                                  url: '/assets/images/ats_library_hall_1784811226108.jpg',
                                },
                                {
                                  name: 'ATS Commencement Hall',
                                  url: '/assets/images/ats_graduation_1784811239280.jpg',
                                },
                              ].map((imgPreset) => (
                                <button
                                  key={imgPreset.url}
                                  type="button"
                                  onClick={() =>
                                    updateHeroSlide(selectedHeroSlide.id, { image: imgPreset.url })
                                  }
                                  className={`text-[10px] p-1.5 rounded border text-left truncate transition-colors cursor-pointer ${
                                    selectedHeroSlide.image === imgPreset.url
                                      ? 'bg-[#D5A52A] text-[#051A33] font-bold border-[#D5A52A]'
                                      : 'bg-[#051A33] text-gray-300 border-white/15 hover:border-white/30'
                                  }`}
                                >
                                  {imgPreset.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Image Preview Thumbnail Box */}
                        <div className="relative rounded-xl overflow-hidden border-2 border-[#D5A52A]/40 aspect-video bg-black/40 flex items-center justify-center shadow-lg">
                          {selectedHeroSlide.image ? (
                            <img
                              src={fixImageUrl(selectedHeroSlide.image)}
                              alt="Slide Preview"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="text-center p-2 text-gray-400 text-xs">
                              <ImageIcon className="w-6 h-6 mx-auto mb-1 text-gray-500" />
                              No Image URL
                            </div>
                          )}
                          <div className="absolute bottom-1 left-1 right-1 bg-black/80 backdrop-blur-sm p-1 text-[9px] text-[#D5A52A] font-mono rounded text-center truncate">
                            Live Slide {safeSlideIdx + 1} Preview
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

                {/* Advanced Typography & Layout Controls Box */}
                <div className="p-5 bg-[#071A46] rounded-xl border border-[#D5A52A]/30 space-y-5">
                  <h3 className="text-xs font-bold text-[#D5A52A] uppercase tracking-wider flex items-center space-x-2">
                    <Type className="w-4 h-4 text-[#D5A52A]" />
                    <span>Global Hero Typography & Layout Settings</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    {/* 1. Title Font Size */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-300">
                        Title Font Size
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: 'small', label: 'Small' },
                          { id: 'medium', label: 'Medium' },
                          { id: 'large', label: 'Large' },
                          { id: 'xlarge', label: 'X-Large' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              updateConfig({
                                heroTitleFontSize: opt.id as 'small' | 'medium' | 'large' | 'xlarge',
                              })
                            }
                            className={`py-1.5 px-2 rounded text-xs font-bold border transition-all cursor-pointer ${
                              (config.heroTitleFontSize || 'medium') === opt.id
                                ? 'bg-[#D5A52A] text-[#071A46] border-[#D5A52A]'
                                : 'bg-[#0D2C68] text-gray-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Subtitle Font Size */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-300">
                        Subtitle Font Size
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: 'small', label: 'Small' },
                          { id: 'medium', label: 'Medium' },
                          { id: 'large', label: 'Large' },
                          { id: 'xlarge', label: 'X-Large' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              updateConfig({
                                heroSubtitleFontSize: opt.id as 'small' | 'medium' | 'large' | 'xlarge',
                              })
                            }
                            className={`py-1.5 px-2 rounded text-xs font-bold border transition-all cursor-pointer ${
                              (config.heroSubtitleFontSize || 'medium') === opt.id
                                ? 'bg-[#D5A52A] text-[#071A46] border-[#D5A52A]'
                                : 'bg-[#0D2C68] text-gray-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Text Alignment */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-300">
                        Text Alignment
                      </label>
                      <div className="flex items-center space-x-1.5">
                        {[
                          { id: 'left', label: 'Left', icon: AlignLeft },
                          { id: 'center', label: 'Center', icon: AlignCenter },
                          { id: 'right', label: 'Right', icon: AlignRight },
                        ].map((opt) => {
                          const Icon = opt.icon;
                          const active = (config.heroTextAlign || 'left') === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() =>
                                updateConfig({
                                  heroTextAlign: opt.id as 'left' | 'center' | 'right',
                                })
                              }
                              className={`flex-1 py-2 px-2 rounded text-xs font-bold border flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                                active
                                  ? 'bg-[#D5A52A] text-[#071A46] border-[#D5A52A]'
                                  : 'bg-[#0D2C68] text-gray-300 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              <span>{opt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 4. Font Style */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-300">
                        Font Family Style
                      </label>
                      <div className="flex items-center space-x-1.5">
                        {[
                          { id: 'serif', label: 'Serif' },
                          { id: 'sans', label: 'Sans' },
                          { id: 'mono', label: 'Mono' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              updateConfig({
                                heroFontStyle: opt.id as 'serif' | 'sans' | 'mono',
                              })
                            }
                            className={`flex-1 py-2 px-2 rounded text-xs font-bold border transition-all cursor-pointer ${
                              (config.heroFontStyle || 'serif') === opt.id
                                ? 'bg-[#D5A52A] text-[#071A46] border-[#D5A52A]'
                                : 'bg-[#0D2C68] text-gray-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* 5. Photo Slider Transparency / Opacity */}
                  <div className="pt-3 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-200 flex items-center space-x-2">
                        <Sliders className="w-4 h-4 text-[#D5A52A]" />
                        <span>Slide Photo Clarity & Transparency (10% to 100%)</span>
                      </label>
                      <span className="text-xs font-mono font-bold text-[#D5A52A] bg-[#0D2C68] px-2.5 py-1 rounded border border-[#D5A52A]/40 shadow">
                        {Math.round((config.heroPhotoOpacity ?? 0.7) * 100)}% Photo Opacity
                      </span>
                    </div>

                    {/* Preset Buttons for Quick Selection */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { val: 1.0, label: '100% Crystal Clear' },
                        { val: 0.85, label: '85% High Clarity' },
                        { val: 0.7, label: '70% Balanced' },
                        { val: 0.5, label: '50% Ambient' },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => updateConfig({ heroPhotoOpacity: preset.val })}
                          className={`py-1.5 px-2 rounded text-xs font-bold border transition-all cursor-pointer ${
                            Math.abs((config.heroPhotoOpacity ?? 0.7) - preset.val) < 0.04
                              ? 'bg-[#D5A52A] text-[#071A46] border-[#D5A52A] shadow-md'
                              : 'bg-[#0D2C68] text-gray-300 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    <input
                      type="range"
                      min="0.10"
                      max="1.00"
                      step="0.05"
                      value={config.heroPhotoOpacity ?? 0.7}
                      onChange={(e) =>
                        updateConfig({ heroPhotoOpacity: parseFloat(e.target.value) })
                      }
                      className="w-full accent-[#D5A52A] bg-[#0D2C68] h-2.5 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                      <span>10% (Transparent)</span>
                      <span>70% (Default)</span>
                      <span>100% (100% Full Vivid Photo Clarity)</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Statistics Editor */}
            <div className="bg-[#0D2C68] border-2 border-[#D5A52A]/40 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="font-serif-heading font-bold text-[#D5A52A]">
                Key Impact Statistics Bar (4 Items)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.stats.map((stat, idx) => (
                  <div key={idx} className="bg-[#071A46] p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="text-xs font-bold text-[#D5A52A]">Stat Card #{idx + 1}</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-gray-400">Number Value</label>
                        <input
                          type="number"
                          value={stat.number}
                          onChange={(e) => {
                            const newStats = [...config.stats];
                            newStats[idx].number = parseInt(e.target.value) || 0;
                            updateConfig({ stats: newStats });
                          }}
                          className="w-full bg-[#0D2C68] border border-white/20 rounded px-2 py-1 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400">Suffix (e.g. +, YEARS)</label>
                        <input
                          type="text"
                          value={stat.suffix}
                          onChange={(e) => {
                            const newStats = [...config.stats];
                            newStats[idx].suffix = e.target.value;
                            updateConfig({ stats: newStats });
                          }}
                          className="w-full bg-[#0D2C68] border border-white/20 rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400">Main Metric Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...config.stats];
                          newStats[idx].label = e.target.value;
                          updateConfig({ stats: newStats });
                        }}
                        className="w-full bg-[#0D2C68] border border-white/20 rounded px-2 py-1 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400">Sublabel Context</label>
                      <input
                        type="text"
                        value={stat.sublabel}
                        onChange={(e) => {
                          const newStats = [...config.stats];
                          newStats[idx].sublabel = e.target.value;
                          updateConfig({ stats: newStats });
                        }}
                        className="w-full bg-[#0D2C68] border border-white/20 rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => showToast('Hero and Stats updated!')}
                  className="bg-[#08783D] hover:bg-[#066131] text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow flex items-center space-x-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Hero & Stats</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: OBJECTIVES & PARTNERS */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            
            {/* Objectives Editor */}
            <div className="bg-[#0D2C68] border-2 border-[#D5A52A]/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <h2 className="font-serif-heading font-bold text-lg text-[#D5A52A] flex items-center space-x-2">
                  <Target className="w-5 h-5 text-[#D5A52A]" />
                  <span>Strategic Objectives ({config.objectives.length})</span>
                </h2>
              </div>

              <div className="space-y-3">
                {config.objectives.map((obj) => (
                  <div key={obj.id} className="p-4 bg-[#071A46] rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#D5A52A]">OBJ {obj.number}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete Objective "${obj.title}"?`)) {
                            deleteObjective(obj.id);
                            showToast('Objective deleted.');
                          }
                        }}
                        className="text-red-400 hover:text-red-200 text-xs flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={obj.title}
                        onChange={(e) => updateObjective(obj.id, { title: e.target.value })}
                        className="bg-[#0D2C68] border border-white/20 rounded px-2.5 py-1.5 text-xs text-white font-bold"
                        placeholder="Objective Title"
                      />
                      <input
                        type="text"
                        value={obj.targetDate}
                        onChange={(e) => updateObjective(obj.id, { targetDate: e.target.value })}
                        className="bg-[#0D2C68] border border-white/20 rounded px-2.5 py-1.5 text-xs text-white"
                        placeholder="Target Deadline"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={obj.description}
                      onChange={(e) => updateObjective(obj.id, { description: e.target.value })}
                      className="w-full bg-[#0D2C68] border border-white/20 rounded p-2 text-xs text-white"
                      placeholder="Objective Description"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Agencies Editor */}
            <div className="bg-[#0D2C68] border-2 border-[#D5A52A]/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <h3 className="font-serif-heading font-bold text-base text-[#D5A52A] flex items-center space-x-2">
                  <Building className="w-5 h-5 text-[#D5A52A]" />
                  <span>Regulatory & Partner Agencies ({config.partners.length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.partners.map((partner) => (
                  <div key={partner.id} className="bg-[#071A46] p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#D5A52A]">{partner.code}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete Partner "${partner.name}"?`)) {
                            deletePartner(partner.id);
                            showToast('Partner deleted.');
                          }
                        }}
                        className="text-red-400 hover:text-red-200 text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) => updatePartner(partner.id, { name: e.target.value })}
                      className="w-full bg-[#0D2C68] border border-white/20 rounded px-2 py-1 text-xs text-white font-bold"
                    />

                    <input
                      type="text"
                      value={partner.category}
                      onChange={(e) => updatePartner(partner.id, { category: e.target.value })}
                      className="w-full bg-[#0D2C68] border border-white/20 rounded px-2 py-1 text-[11px] text-gray-300"
                    />

                    <textarea
                      rows={2}
                      value={partner.mandate}
                      onChange={(e) => updatePartner(partner.id, { mandate: e.target.value })}
                      className="w-full bg-[#0D2C68] border border-white/20 rounded p-2 text-xs text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 6: BACKUP & RESET */}
        {activeTab === 'backup' && (
          <div className="bg-[#0D2C68] border-2 border-[#D5A52A]/40 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="border-b border-white/15 pb-3">
              <h2 className="font-serif-heading font-bold text-lg text-white flex items-center space-x-2">
                <FileCode className="w-5 h-5 text-[#D5A52A]" />
                <span>Project Backup, Export & System Reset</span>
              </h2>
              <p className="text-xs text-gray-300">
                Export your configured project settings or restore back to default settings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Export JSON */}
              <div className="p-5 bg-[#071A46] rounded-xl border border-white/10 space-y-3">
                <h3 className="font-bold text-sm text-[#D5A52A] flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Project Backup</span>
                </h3>
                <p className="text-xs text-gray-300">
                  Download a complete JSON configuration file containing all members, logo, footer, and custom settings.
                </p>
                <button
                  onClick={handleExportJSON}
                  className="bg-[#08783D] hover:bg-[#066131] text-white px-4 py-2 rounded-lg text-xs font-bold shadow flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Configuration JSON</span>
                </button>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="p-5 bg-[#071A46] rounded-xl border border-red-500/30 space-y-3">
                <h3 className="font-bold text-sm text-red-400 flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Original Defaults</span>
                </h3>
                <p className="text-xs text-gray-300">
                  Wipe custom logos, restored initial government & ATS-Kenya signatories, and default text.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset the project configuration to default? All custom edits will be reverted.')) {
                      resetToDefaults();
                      showToast('Project reset to default configuration!');
                    }
                  }}
                  className="bg-red-900/80 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow flex items-center space-x-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restore Factory Defaults</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
