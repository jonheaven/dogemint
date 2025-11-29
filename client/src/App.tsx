
import Header from './components/Header';
import Footer from './components/Footer';

import MintForm from './components/MintForm';
import WalletPanel from './components/WalletPanel';
import BatchMintPanel from './components/BatchMintPanel';
import UtxoPanel from './components/UtxoPanel';
import TxHistoryPanel from './components/TxHistoryPanel';
import SettingsPanel from './components/SettingsPanel';
import InscriptionPanel from './components/InscriptionPanel';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <InscriptionPanel />
        <MintForm />
        <WalletPanel />
        <BatchMintPanel />
        <UtxoPanel />
        <TxHistoryPanel />
        <SettingsPanel />
      </main>
      <Footer />
    </div>
  );
}

export default App;
