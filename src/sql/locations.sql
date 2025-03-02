-- First, ensure that your tables are created
-- Uncomment these if you need to create the tables
-- CREATE TABLE state (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL UNIQUE
-- );

-- CREATE TABLE lga (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   "stateId" INTEGER NOT NULL REFERENCES state(id)
-- );

-- Step 1: Insert all states from the JSON
INSERT INTO state (name) VALUES
('Abia'),
('Adamawa'),
('Akwa Ibom'),
('Anambra'),
('Bauchi'),
('Bayelsa'),
('Benue'),
('Borno'),
('Cross River'),
('Delta'),
('Ebonyi'),
('Edo'),
('Ekiti'),
('Enugu'),
('Gombe'),
('Imo'),
('Jigawa'),
('Kaduna'),
('Kano'),
('Katsina'),
('Kebbi'),
('Kogi'),
('Kwara'),
('Lagos'),
('Nasarawa'),
('Niger'),
('Ogun'),
('Ondo'),
('Osun'),
('Oyo'),
('Plateau'),
('Rivers'),
('Sokoto'),
('Taraba'),
('Yobe'),
('Zamfara'),
('Abuja (FCT)');

-- Step 2: Insert LGAs with references to their respective states

-- Abia LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Aba North'), ('Aba South'), ('Arochukwu'), ('Bende'), ('Ikwuano'), 
    ('Isiala Ngwa North'), ('Isiala Ngwa South'), ('Isuikwuato'), ('Obi Ngwa'), 
    ('Ohafia'), ('Osisioma Ngwa'), ('Ugwunagbo'), ('Ukwa East'), ('Ukwa West'), 
    ('Umuahia North'), ('Umuahia South'), ('Umu Nneochi')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Abia';

-- Adamawa LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Demsa'), ('Fufure'), ('Ganye'), ('Gayuk'), ('Gombi'), ('Grie'), ('Hong'), 
    ('Jada'), ('Lamurde'), ('Madagali'), ('Maiha'), ('Mayo Belwa'), ('Michika'), 
    ('Mubi North'), ('Mubi South'), ('Numan'), ('Shelleng'), ('Song'), ('Toungo'), 
    ('Yola North'), ('Yola South')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Adamawa';

-- Akwa Ibom LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Abak'), ('Eastern Obolo'), ('Eket'), ('Esit Eket'), ('Essien Udim'), 
    ('Etim Ekpo'), ('Etinan'), ('Ibeno'), ('Ibesikpo Asutan'), ('Ibiono Ibom'), 
    ('Ika'), ('Ikono'), ('Ikot Abasi'), ('Ikot Ekpene'), ('Ini'), ('Itu'), ('Mbo'), 
    ('Mkpat Enin'), ('Nsit Atai'), ('Nsit Ibom'), ('Nsit Ubium'), ('Obot Akara'), 
    ('Okobo'), ('Onna'), ('Oron'), ('Oruk Anam'), ('Udung Uko'), ('Ukanafun'), 
    ('Uruan'), ('Urue-Offong/Oruko'), ('Uyo')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Akwa Ibom';

-- Anambra LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Aguata'), ('Anambra East'), ('Anambra West'), ('Anaocha'), ('Awka North'), 
    ('Awka South'), ('Ayamelum'), ('Dunukofia'), ('Ekwusigo'), ('Idemili North'), 
    ('Idemili South'), ('Ihiala'), ('Njikoka'), ('Nnewi North'), ('Nnewi South'), 
    ('Ogbaru'), ('Onitsha North'), ('Onitsha South'), ('Orumba North'), 
    ('Orumba South'), ('Oyi')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Anambra';

-- Bauchi LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Alkaleri'), ('Bauchi'), ('Bogoro'), ('Damban'), ('Darazo'), ('Dass'), 
    ('Gamawa'), ('Ganjuwa'), ('Giade'), ('Itas/Gadau'), ('Jama''are'), ('Katagum'), 
    ('Kirfi'), ('Misau'), ('Ningi'), ('Shira'), ('Tafawa Balewa'), ('Toro'), 
    ('Warji'), ('Zaki')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Bauchi';

-- Bayelsa LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Brass'), ('Ekeremor'), ('Kolokuma/Opokuma'), ('Nembe'), ('Ogbia'), 
    ('Sagbama'), ('Southern Ijaw'), ('Yenagoa')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Bayelsa';

-- Benue LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Ado'), ('Agatu'), ('Apa'), ('Buruku'), ('Gboko'), ('Guma'), ('Gwer East'), 
    ('Gwer West'), ('Katsina-Ala'), ('Konshisha'), ('Kwande'), ('Logo'), ('Makurdi'), 
    ('Obi'), ('Ogbadibo'), ('Ohimini'), ('Oju'), ('Okpokwu'), ('Oturkpo'), ('Tarka'), 
    ('Ukum'), ('Ushongo'), ('Vandeikya')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Benue';

-- Borno LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Abadam'), ('Askira/Uba'), ('Bama'), ('Bayo'), ('Biu'), ('Chibok'), ('Damboa'), 
    ('Dikwa'), ('Gubio'), ('Guzamala'), ('Gwoza'), ('Hawul'), ('Jere'), ('Kaga'), 
    ('Kala/Balge'), ('Konduga'), ('Kukawa'), ('Kwaya Kusar'), ('Mafa'), ('Magumeri'), 
    ('Maiduguri'), ('Marte'), ('Mobbar'), ('Monguno'), ('Ngala'), ('Nganzai'), ('Shani')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Borno';

-- Cross River LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Abi'), ('Akamkpa'), ('Akpabuyo'), ('Bakassi'), ('Bekwarra'), ('Biase'), 
    ('Boki'), ('Calabar Municipal'), ('Calabar South'), ('Etung'), ('Ikom'), 
    ('Obanliku'), ('Obubra'), ('Obudu'), ('Odukpani'), ('Ogoja'), ('Yakuur'), ('Yala')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Cross River';

-- Delta LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Aniocha North'), ('Aniocha South'), ('Bomadi'), ('Burutu'), ('Ethiope East'), 
    ('Ethiope West'), ('Ika North East'), ('Ika South'), ('Isoko North'), 
    ('Isoko South'), ('Ndokwa East'), ('Ndokwa West'), ('Okpe'), ('Oshimili North'), 
    ('Oshimili South'), ('Patani'), ('Sapele'), ('Udu'), ('Ughelli North'), 
    ('Ughelli South'), ('Ukwuani'), ('Uvwie'), ('Warri North'), ('Warri South'), 
    ('Warri South West')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Delta';

-- Ebonyi LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Abakaliki'), ('Afikpo North'), ('Afikpo South'), ('Ebonyi'), ('Ezza North'), 
    ('Ezza South'), ('Ikwo'), ('Ishielu'), ('Ivo'), ('Izzi'), ('Ohaozara'), 
    ('Ohaukwu'), ('Onicha')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Ebonyi';

-- Edo LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Akoko-Edo'), ('Egor'), ('Esan Central'), ('Esan North-East'), ('Esan South-East'), 
    ('Esan West'), ('Etsako Central'), ('Etsako East'), ('Etsako West'), ('Igueben'), 
    ('Ikpoba Okha'), ('Orhionmwon'), ('Oredo'), ('Ovia North-East'), ('Ovia South-West'), 
    ('Owan East'), ('Owan West'), ('Uhunmwonde')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Edo';

-- Ekiti LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Ado Ekiti'), ('Efon'), ('Ekiti East'), ('Ekiti South-West'), ('Ekiti West'), 
    ('Emure'), ('Gbonyin'), ('Ido Osi'), ('Ijero'), ('Ikere'), ('Ikole'), ('Ilejemeje'), 
    ('Irepodun/Ifelodun'), ('Ise/Orun'), ('Moba'), ('Oye')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Ekiti';

-- Enugu LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Aninri'), ('Awgu'), ('Enugu East'), ('Enugu North'), ('Enugu South'), ('Ezeagu'), 
    ('Igbo Etiti'), ('Igbo Eze North'), ('Igbo Eze South'), ('Isi Uzo'), ('Nkanu East'), 
    ('Nkanu West'), ('Nsukka'), ('Oji River'), ('Udenu'), ('Udi'), ('Uzo Uwani')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Enugu';

-- Gombe LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Akko'), ('Balanga'), ('Billiri'), ('Dukku'), ('Funakaye'), ('Gombe'), 
    ('Kaltungo'), ('Kwami'), ('Nafada'), ('Shongom'), ('Yamaltu/Deba')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Gombe';

-- Imo LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Aboh Mbaise'), ('Ahiazu Mbaise'), ('Ehime Mbano'), ('Ezinihitte'), 
    ('Ideato North'), ('Ideato South'), ('Ihitte/Uboma'), ('Ikeduru'), ('Isiala Mbano'), 
    ('Isu'), ('Mbaitoli'), ('Ngor Okpala'), ('Njaba'), ('Nkwerre'), ('Nwangele'), 
    ('Obowo'), ('Oguta'), ('Ohaji/Egbema'), ('Okigwe'), ('Orlu'), ('Orsu'), ('Oru East'), 
    ('Oru West'), ('Owerri Municipal'), ('Owerri North'), ('Owerri West'), ('Unuimo')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Imo';

-- Jigawa LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Auyo'), ('Babura'), ('Biriniwa'), ('Birnin Kudu'), ('Buji'), ('Dutse'), 
    ('Gagarawa'), ('Garki'), ('Gumel'), ('Guri'), ('Gwaram'), ('Gwiwa'), ('Hadejia'), 
    ('Jahun'), ('Kafin Hausa'), ('Kazaure'), ('Kiri Kasama'), ('Kiyawa'), ('Kaugama'), 
    ('Maigatari'), ('Malam Madori'), ('Miga'), ('Ringim'), ('Roni'), ('Sule Tankarkar'), 
    ('Taura'), ('Yankwashi')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Jigawa';

-- Kaduna LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Birnin Gwari'), ('Chikun'), ('Giwa'), ('Igabi'), ('Ikara'), ('Jaba'), ('Jema''a'), 
    ('Kachia'), ('Kaduna North'), ('Kaduna South'), ('Kagarko'), ('Kajuru'), ('Kaura'), 
    ('Kauru'), ('Kubau'), ('Kudan'), ('Lere'), ('Makarfi'), ('Sabon Gari'), ('Sanga'), 
    ('Soba'), ('Zangon Kataf'), ('Zaria')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Kaduna';

-- Kano LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Ajingi'), ('Albasu'), ('Bagwai'), ('Bebeji'), ('Bichi'), ('Bunkure'), ('Dala'), 
    ('Dambatta'), ('Dawakin Kudu'), ('Dawakin Tofa'), ('Doguwa'), ('Fagge'), ('Gabasawa'), 
    ('Garko'), ('Garun Mallam'), ('Gaya'), ('Gezawa'), ('Gwale'), ('Gwarzo'), ('Kabo'), 
    ('Kano Municipal'), ('Karaye'), ('Kibiya'), ('Kiru'), ('Kumbotso'), ('Kunchi'), ('Kura'), 
    ('Madobi'), ('Makoda'), ('Minjibir'), ('Nasarawa'), ('Rano'), ('Rimin Gado'), ('Rogo'), 
    ('Shanono'), ('Sumaila'), ('Takai'), ('Tarauni'), ('Tofa'), ('Tsanyawa'), ('Tudun Wada'), 
    ('Ungogo'), ('Warawa'), ('Wudil')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Kano';

-- Katsina LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Bakori'), ('Batagarawa'), ('Batsari'), ('Baure'), ('Bindawa'), ('Charanchi'), 
    ('Dandume'), ('Danja'), ('Dan Musa'), ('Daura'), ('Dutsi'), ('Dutsin Ma'), ('Faskari'), 
    ('Funtua'), ('Ingawa'), ('Jibia'), ('Kafur'), ('Kaita'), ('Kankara'), ('Kankia'), 
    ('Katsina'), ('Kurfi'), ('Kusada'), ('Mai''Adua'), ('Malumfashi'), ('Mani'), ('Mashi'), 
    ('Matazu'), ('Musawa'), ('Rimi'), ('Sabuwa'), ('Safana'), ('Sandamu'), ('Zango')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Katsina';

-- Kebbi LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Aleiro'), ('Arewa Dandi'), ('Argungu'), ('Augie'), ('Bagudo'), ('Birnin Kebbi'), 
    ('Bunza'), ('Dandi'), ('Fakai'), ('Gwandu'), ('Jega'), ('Kalgo'), ('Koko/Besse'), 
    ('Maiyama'), ('Ngaski'), ('Sakaba'), ('Shanga'), ('Suru'), ('Wasagu/Danko'), ('Yauri'), ('Zuru')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Kebbi';

-- Kogi LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Adavi'), ('Ajaokuta'), ('Ankpa'), ('Bassa'), ('Dekina'), ('Ibaji'), ('Idah'), 
    ('Igalamela Odolu'), ('Ijumu'), ('Kabba/Bunu'), ('Kogi'), ('Lokoja'), ('Mopa Muro'), 
    ('Ofu'), ('Ogori/Magongo'), ('Okehi'), ('Okene'), ('Olamaboro'), ('Omala'), 
    ('Yagba East'), ('Yagba West')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Kogi';

-- Kwara LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Asa'), ('Baruten'), ('Edu'), ('Ekiti'), ('Ifelodun'), ('Ilorin East'), 
    ('Ilorin South'), ('Ilorin West'), ('Irepodun'), ('Isin'), ('Kaiama'), ('Moro'), 
    ('Offa'), ('Oke Ero'), ('Oyun'), ('Pategi')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Kwara';

-- Lagos LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Agege'), ('Ajeromi-Ifelodun'), ('Alimosho'), ('Amuwo-Odofin'), ('Apapa'), 
    ('Badagry'), ('Epe'), ('Eti Osa'), ('Ibeju-Lekki'), ('Ifako-Ijaiye'), ('Ikeja'), 
    ('Ikorodu'), ('Kosofe'), ('Lagos Island'), ('Lagos Mainland'), ('Mushin'), ('Ojo'), 
    ('Oshodi-Isolo'), ('Shomolu'), ('Surulere')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Lagos';

-- Nasarawa LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Akwanga'), ('Awe'), ('Doma'), ('Karu'), ('Keana'), ('Keffi'), ('Kokona'), 
    ('Lafia'), ('Nasarawa'), ('Nasarawa Egon'), ('Obi'), ('Toto'), ('Wamba')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Nasarawa';

-- Niger LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Agaie'), ('Agwara'), ('Bida'), ('Borgu'), ('Bosso'), ('Chanchaga'), ('Edati'), 
    ('Gbako'), ('Gurara'), ('Katcha'), ('Kontagora'), ('Lapai'), ('Lavun'), ('Magama'), 
    ('Mariga'), ('Mashegu'), ('Mokwa'), ('Munya'), ('Paikoro'), ('Rafi'), ('Rijau'), 
    ('Shiroro'), ('Suleja'), ('Tafa'), ('Wushishi')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Niger';

-- Ogun LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Abeokuta North'), ('Abeokuta South'), ('Ado-Odo/Ota'), ('Egbado North'), 
    ('Egbado South'), ('Ewekoro'), ('Ifo'), ('Ijebu East'), ('Ijebu North'), 
    ('Ijebu North East'), ('Ijebu Ode'), ('Ikenne'), ('Imeko Afon'), ('Ipokia'), 
    ('Obafemi Owode'), ('Odeda'), ('Odogbolu'), ('Ogun Waterside'), ('Remo North'), ('Shagamu')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Ogun';

-- Ondo LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Akoko North-East'), ('Akoko North-West'), ('Akoko South-East'), ('Akoko South-West'), 
    ('Akure North'), ('Akure South'), ('Ese Odo'), ('Idanre'), ('Ifedore'), ('Ilaje'), 
    ('Ile Oluji/Okeigbo'), ('Irele'), ('Odigbo'), ('Okitipupa'), ('Ondo East'), 
    ('Ondo West'), ('Ose'), ('Owo')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Ondo';

-- Osun LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Atakunmosa East'), ('Atakunmosa West'), ('Aiyedaade'), ('Aiyedire'), ('Boluwaduro'), 
    ('Boripe'), ('Ede North'), ('Ede South'), ('Egbedore'), ('Ejigbo'), ('Ife Central'), 
    ('Ife East'), ('Ife North'), ('Ife South'), ('Ifedayo'), ('Ifelodun'), ('Ila'), 
    ('Ilesa East'), ('Ilesa West'), ('Irepodun'), ('Irewole'), ('Isokan'), ('Iwo'), 
    ('Obokun'), ('Odo Otin'), ('Ola Oluwa'), ('Olorunda'), ('Oriade'), ('Orolu'), ('Osogbo')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Osun';

-- Oyo LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Afijio'), ('Akinyele'), ('Atiba'), ('Atisbo'), ('Egbeda'), ('Ibadan North'), 
    ('Ibadan North-East'), ('Ibadan North-West'), ('Ibadan South-East'), ('Ibadan South-West'), 
    ('Ibarapa Central'), ('Ibarapa East'), ('Ibarapa North'), ('Ido'), ('Irepo'), ('Iseyin'), 
    ('Itesiwaju'), ('Iwajowa'), ('Kajola'), ('Lagelu'), ('Ogbomosho North'), ('Ogbomosho South'), 
    ('Ogo Oluwa'), ('Olorunsogo'), ('Oluyole'), ('Ona Ara'), ('Orelope'), ('Ori Ire'), 
    ('Oyo East'), ('Oyo West'), ('Saki East'), ('Saki West'), ('Surulere')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Oyo';

-- Plateau LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Barkin Ladi'), ('Bassa'), ('Bokkos'), ('Jos East'), ('Jos North'), ('Jos South'), 
    ('Kanam'), ('Kanke'), ('Langtang North'), ('Langtang South'), ('Mangu'), ('Mikang'), 
    ('Pankshin'), ('Qua''an Pan'), ('Riyom'), ('Shendam'), ('Wase')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Plateau';

-- Rivers LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Abua/Odual'), ('Ahoada East'), ('Ahoada West'), ('Akuku-Toru'), ('Andoni'), 
    ('Asari-Toru'), ('Bonny'), ('Degema'), ('Eleme'), ('Emuoha'), ('Etche'), ('Gokana'), 
    ('Ikwerre'), ('Khana'), ('Obio/Akpor'), ('Ogba/Egbema/Ndoni'), ('Ogu/Bolo'), ('Okrika'), 
    ('Omuma'), ('Opobo/Nkoro'), ('Oyigbo'), ('Port Harcourt'), ('Tai')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Rivers';

-- Sokoto LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Binji'), ('Bodinga'), ('Dange Shuni'), ('Gada'), ('Goronyo'), ('Gudu'), ('Gwadabawa'), 
    ('Illela'), ('Isa'), ('Kebbe'), ('Kware'), ('Rabah'), ('Sabon Birni'), ('Shagari'), 
    ('Silame'), ('Sokoto North'), ('Sokoto South'), ('Tambuwal'), ('Tangaza'), ('Tureta'), 
    ('Wamako'), ('Wurno'), ('Yabo')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Sokoto';

-- Taraba LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Ardo Kola'), ('Bali'), ('Donga'), ('Gashaka'), ('Gassol'), ('Ibi'), ('Jalingo'), 
    ('Karim Lamido'), ('Kurmi'), ('Lau'), ('Sardauna'), ('Takum'), ('Ussa'), ('Wukari'), 
    ('Yorro'), ('Zing')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Taraba';

-- Yobe LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Bade'), ('Bursari'), ('Damaturu'), ('Fika'), ('Fune'), ('Geidam'), ('Gujba'), 
    ('Gulani'), ('Jakusko'), ('Karasuwa'), ('Machina'), ('Nangere'), ('Nguru'), 
    ('Potiskum'), ('Tarmuwa'), ('Yunusari'), ('Yusufari')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Yobe';

-- Zamfara LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Anka'), ('Bakura'), ('Birnin Magaji/Kiyaw'), ('Bukkuyum'), ('Bungudu'), ('Gummi'), 
    ('Gusau'), ('Kaura Namoda'), ('Maradun'), ('Maru'), ('Shinkafi'), ('Talata Mafara'), 
    ('Chafe'), ('Zurmi')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Zamfara';

-- Abuja (FCT) LGAs
INSERT INTO lga (name, "stateId")
SELECT lga_name, state.id
FROM (VALUES
    ('Abaji'), ('Bwari'), ('Gwagwalada'), ('Kuje'), ('Kwali'), ('Municipal Area Council (AMAC)')
) AS lga_values(lga_name)
CROSS JOIN state WHERE state.name = 'Abuja (FCT)';