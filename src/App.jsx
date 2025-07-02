
import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Whiteboard from '@/components/Whiteboard';

function App() {
  return (
    <>
      <Helmet>
        <title>Realtime Whiteboard - Collaborate & Create</title>
        <meta name="description" content="A powerful realtime whiteboard app for collaborative drawing, sketching, and brainstorming with friends and teams." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <Whiteboard />
        <Toaster />
      </div>
    </>
  );
}

export default App;
